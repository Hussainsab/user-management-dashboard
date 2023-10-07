import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import UsersList from "../components/UsersList";
import Form from "../components/Form";
import Message from "../components/Message";
import useWindowDiamention from "../hooks/useWindowDiamention";
import styles from "./DashBoard.module.css";

function Dashboard() {
  const { loading, message, edit } = useUserContext();
  let width = useWindowDiamention();

  //on initial loading Data from Api this component will be rendered
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.dashboard}>
      <Header />
      <UsersList />
      {/* if width is below 650px pagination is removed and infinite scrolling is applied
      //if width goes more than 650px then pagination will be apeared to manage users per page 
      // I have assumed per page 5 users will be displayed.*/}
      {width >= 650 && <Pagination />}
      {edit?.isTrue && <Form />}
      <Message message={message?.message} success={message?.success} />
    </div>
  );
}

export default Dashboard;
