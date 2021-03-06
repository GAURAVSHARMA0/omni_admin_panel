import { Spinner } from 'reactstrap';

const SpinnerCom = (props) => {
  return (
    <div>
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="secondary" />
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="dark" />
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="light" />
    </div>
  );
}

export default SpinnerCom;