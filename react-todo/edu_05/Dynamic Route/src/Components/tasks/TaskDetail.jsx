import { useParams } from "react-router-dom";
import { useFatch } from "../hooks/useFetch";
import { doneTask, getTask } from "../../http/http";
import { useCallback, useState } from "react";

// /todo/:id
const TaskItem = () => {
  const { id } = useParams(); //-- 객체리터럴이어서 분해해서 사용 가능

  const [rnd, setRnd] = useState();

  //console.log("id: ", id);

  const taskFetch = useCallback(() => {
    return getTask(`${id}?rdn=${rnd}`);
  }, [id, rnd]); //-- id 가 바뀐다면... 이 내용으로 이함수를 다시 실행하고, 아니라면 새롭게 task 불러오기
  //-- rnd 랜덤값을 넣어서 캐싱을 피함!!!

  const { fetchedData, isLoading } = useFatch({}, taskFetch);

  //     () => {
  //     //-- () => { 에서 바뀌었다고 판단해서 무한으로 바뀌는 현상해결을 위해 분리함 -> useCallback 사용!!
  //     return getTask(id);
  //   }

  const doneTodoItemHandler = () => {
    const doneFetch = async (fnCallback) => {
      const json = doneTask(id);
      console.log(json);
      //fnCallback(json.body.taskId);
    };

    doneFetch(() => {
      console.log("완료 처리 함.");
      setRnd(Math.random());
    });
  };

  return (
    <div className="wrapper">
      {isLoading && <div>데이터를 불러오는 중입니다.</div>}
      {!isLoading && (
        <div>
          <h1>{fetchedData.body.task}</h1>
          <h3>완료 예정일자: {fetchedData.body.dueDate}</h3>
          <h3>우선순위: {fetchedData.body.priority}</h3>
          <h3>등록일자: {fetchedData.body.createAt}</h3>
          {!fetchedData.body.done && (
            <button
              type="button"
              className="confirm-ok"
              onClick={doneTodoItemHandler}
            >
              완료
            </button>
          )}
          {fetchedData.body.done && (
            <h3>완료일자: {fetchedData.body.doneAt}</h3>
          )}
        </div>
      )}
    </div>
  );
};
export default TaskItem;
