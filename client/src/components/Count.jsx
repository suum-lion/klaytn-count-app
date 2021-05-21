import cx from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useKaikas } from "../hooks/useKaikas";
import caver from "../klaytn/caver";
import "./Count.scss";

const Count = () => {
  const { account, balance } = useKaikas();
  const { DEPLOYED_ABI, DEPLOYED_ADDRESS } = useMemo(() => {
    return {
      DEPLOYED_ABI: process.env.DEPLOYED_ABI,
      DEPLOYED_ADDRESS: process.env.DEPLOYED_ADDRESS
    };
  }, []);
  const countContract = useMemo(() => {
    if (DEPLOYED_ABI && DEPLOYED_ADDRESS) {
      return new caver.klay.Contract(
        JSON.parse(DEPLOYED_ABI),
        DEPLOYED_ADDRESS
      );
    }
  }, [DEPLOYED_ABI, DEPLOYED_ADDRESS]);

  const [count, setCount] = useState("");
  const [lastParticipant, setLastParticipant] = useState("");
  const [direction, setDirection] = useState(null);
  const [txHash, setTxHash] = useState("");

  const intervalId = useRef(null);

  const getCount = useCallback(async () => {
    const count = await countContract.methods.count().call();
    const lastParticipant = await countContract.methods
      .lastParticipant()
      .call();
    setCount(count);
    setLastParticipant(lastParticipant);
  }, [countContract.methods]);

  const setPlus = useCallback(() => {

    setDirection("plus");

    // TODO event emitter 처리
    countContract.methods.plus().send({
      from: account,
      gas: "200000"
    });
    // .on("transactionHash", txHash => {
    //   console.log(`
    //     Sending a transaction... (Call contract's function 'plus')
    //     txHash: ${txHash}
    //     `);
    // })
    // .on("receipt", receipt => {
    //   console.log(
    //     `
    //     Received receipt! It means your transaction(calling plus function)
    //     is in klaytn block(#${receipt.blockNumber})
    //   `,
    //     receipt
    //   );
    //   setDirection(null);
    //   setTxHash(receipt.transactionHash);
    // })
    // .on("error", error => {
    //   alert(error.message);
    //   setDirection(null);
    // });
  }, [account, countContract.methods]);

  const setMinus = useCallback(() => {

    setDirection("minus");
    countContract.methods.minus().send({
      from: account,
      gas: "200000"
    });
    // .on("transactionHash", txHash => {
    //   console.log(`
    //   Sending a transaction... (Call contract's function 'minus')
    //   txHash: ${txHash}
    //   `);
    // })
    // .on("receipt", receipt => {
    //   console.log(
    //     `
    //   Received receipt which means your transaction(calling minus function)
    //   is in klaytn block(#${receipt.blockNumber})
    // `,
    //     receipt
    //   );
    //   setDirection(null);
    //   setTxHash(receipt.transactionHash);
    // })
    // .on("error", error => {
    //   alert(error.message);
    //   setDirection(null);
    // });
  }, [account, countContract.methods]);

  useEffect(() => {
    intervalId.current = setInterval(getCount, 1000);

    return () => clearInterval(intervalId.current);
  }, [getCount]);

  return (
    <div className="Count">
      <h1>Balance: {balance}</h1>
      {Number(lastParticipant) !== 0 && (
        <div className="Count__lastParticipant">
          last participant: {lastParticipant}
        </div>
      )}
      <div className="Count__count">COUNT: {count}</div>
      <button
        onClick={setPlus}
        className={cx("Count__button", {
          "Count__button--setting": direction === "plus"
        })}
      >
        +
      </button>
      <button
        onClick={setMinus}
        className={cx("Count__button", {
          "Count__button--setting": direction === "minus"
        })}
        disabled={count === 0}
      >
        -
      </button>
      {txHash && (
        <div className="Count__lastTransaction">
          <p className="Count__lastTransactionMessage">
            You can check your last transaction in klaytnscope:
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://scope.klaytn.com/transaction/${txHash}`}
            className="Count__lastTransactionLink"
          >
            {txHash}
          </a>
        </div>
      )}
    </div>
  );
};

export default Count;
