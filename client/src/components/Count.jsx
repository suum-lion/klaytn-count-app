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
  const { account, balance, network } = useKaikas();
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

    countContract.methods
      .plus()
      .send({
        from: account,
        gas: "200000"
      })
      .then(receipt => {
        setDirection(null);
        setTxHash(receipt.transactionHash);
      })
      .catch(e => {
        alert(e);
        setDirection(null);
      });
  }, [account, countContract.methods]);

  const setMinus = useCallback(() => {
    setDirection("minus");
    countContract.methods
      .minus()
      .send({
        from: account,
        gas: "200000"
      })
      .then(receipt => {
        setDirection(null);
        setTxHash(receipt.transactionHash);
      })
      .catch(e => {
        alert(e);
        setDirection(null);
      });
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
            href={`https://${
              network === 1001 ? "baobab." : ""
            }scope.klaytn.com/tx/${txHash}`}
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
