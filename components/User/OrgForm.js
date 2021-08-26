import { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import Input from "../UI/Input";
import classes from "./OrgForm.module.scss";

const JoinOrgForm = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingOrg, setLoadingOrg] = useState(false);
  const [joiningOrg, setJoiningOrg] = useState(false);
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  const [queriedOrg, setQueriedOrg] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (input) => {
    setLoadingOrg(true);
    // TODO query if code is valid
    const isValid = true;
    if (isValid) {
      // TODO save queried org as state
      setQueriedOrg({
        name: "Lorem",
        location: "Auckland, New Zealand",
        educators: "8",
        learners: "143",
      });
      setShowConfirm(true);
    } else {
      setShowInvalidCode(true);
    }
    setLoadingOrg(false);
  };

  const joinOrgHandler = () => {
    // TODO join the org
    // TODO fail handler
    // TODO success handler
  };

  return (
    <>
      {showConfirm ? (
        <div className={classes.joinConfirm}>
          <div className={classes.instruction}>You are now joining</div>
          <div className={classes.orgName}>{queriedOrg.name}</div>
          <div className={classes.orgLoc}>{queriedOrg.location}</div>
          <div className={classes.orgUsers}>
            <div>
              <i className="material-icons-outlined">school</i>
              {queriedOrg.educators}
            </div>
            <div>
              <i className="material-icons-outlined">backpack</i>
              {queriedOrg.learners}
            </div>
          </div>
          <div className={classes.joinConfirmBtnContainer}>
            {!joiningOrg && (
              <SecondaryButton
                className={classes.joinCancelBtn}
                onClick={() => setShowConfirm(false)}
                mainLabel="Cancel"
              />
            )}
            <PrimaryButton
              className={classes.joinBtn}
              isLoading={joiningOrg}
              mainLabel="Confirm"
              onClick={joinOrgHandler}
            />
          </div>
        </div>
      ) : (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={classes.instruction}>
            Enter your organisation code below:
          </p>
          <Input
            className={classes.input}
            onFocus={() => setShowInvalidCode(false)}
            inputProps={{
              className: classes.joinInput,
              type: "text",
              placeholder: "Organisation code*",
              ...register("org", {
                required: "Please enter an organisation code",
              }),
            }}
            error={errors.org || showInvalidCode}
          />
          <PrimaryButton
            className={classes.joinBtn}
            isLoading={loadingOrg}
            type="submit"
            mainLabel="Join"
          />
          {showInvalidCode && (
            <div className={classes.invalidCode}>
              The code you entered is invalid. Please try again
            </div>
          )}
        </form>
      )}
    </>
  );
};

const CreateOrgForm = () => {
  const [loadingOrg, setCreatingOrg] = useState(false);
  const [invalidId, setInvalidId] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (input) => {
    setCreatingOrg(true);
    if (input.schoolId === "taken") {
      // TODO
      setInvalidId("School ID already registered");
    } else if (input.schoolId === "absent") {
      // TODO
      setInvalidId("School ID does not exist");
    } else {
      // TODO create and join the org
      alert("nice!");
    }
    setCreatingOrg(false);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={classes.instruction}>
        To sign up your school for the first time, enter its details below:
      </p>
      <Input
        className={classes.input}
        onFocus={() => setInvalidId(false)}
        style={{ margin: "3vh 0 0.5vh 0" }}
        inputProps={{
          className: classes.createInput,
          type: "text",
          placeholder: "School ID*",
          ...register("schoolId", {
            required: "Please enter your school ID",
          }),
        }}
        error={errors.schoolId || invalidId}
      />
      <Input
        className={classes.input}
        style={{ margin: "0.5vh 0 3vh 0" }}
        inputProps={{
          className: classes.createInput,
          type: "text",
          placeholder: "School Name*",
          ...register("schoolName", {
            required: "Please enter your school name",
          }),
        }}
        error={errors.schoolName}
      />
      <PrimaryButton
        className={classes.createBtn}
        isLoading={loadingOrg}
        type="submit"
        mainLabel="Create Organisation"
      />
      {invalidId && (
        <div className={classes.invalidCode}>
          The code you entered is invalid. Please try again
        </div>
      )}
    </form>
  );
};

const OrgForm = ({ access, action, setCta }) => {
  return (
    <div className={classes.container}>
      <div className={classes.tabContainer}>
        <button
          className={`${classes.tab} ${
            action === "join" ? classes.joinActive : ""
          }`}
          onClick={() => setCta("join")}
        >
          Join an org
        </button>
        {access !== "learner" && (
          <button
            className={`${classes.tab} ${
              action === "create" ? classes.createActive : ""
            }`}
            onClick={() => setCta("create")}
          >
            Create an org
          </button>
        )}
      </div>
      {action === "join" ? <JoinOrgForm /> : <CreateOrgForm />}
    </div>
  );
};

export default OrgForm;
