import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function ErrorComponent() {
  return (
    <div>
      <Result
        className="error-container"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to={"/"}>Back Home</Link>
          </Button>
        }
      />
    </div>
  );
}

export default ErrorComponent;
