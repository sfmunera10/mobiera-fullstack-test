import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { PATH } from "../../constants/Constants";
import "./NotFound.styles.css";

const NotFound: React.FC<{}> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="not__found">
      <h2>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST</h2>
      <Button
        className="primary"
        type="button"
        height="50px"
        border="none"
        borderRadius="6px"
        width="120px"
        childrenText="Go back"
        onClick={() => navigate(PATH.USERS)}
      />
    </div>
  );
};

export default NotFound;
