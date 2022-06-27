import React, { useState, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import InputGroup from "../../components/form/InputGroup";
import { ax } from "../../config/default";

import { IoLockClosed, IoMail, IoPerson } from "react-icons/io5";

import { SignupTypes } from "./signupType";
import {
  checkPattern,
  validateEmail,
  validatePassword,
} from "../../utils/ValidateInput";
import DateInput from "../../components/form/DateInput";
import SelectCountry from "../../components/form/SelectCountry";
import monthLists from "../../utils/monthLists";
import Loading from "./components/Loading";
import FormHeader from "../../components/form/FormHeader";
import FormWrapper from "../../components/form/FormWrapper";
import FormFooter from "../../components/form/FormFooter";

const SignUp: React.FC = () => {
  const [userInputs, setUserInputs] = useState<SignupTypes>({
    fullName: "",
    email: "",
    password: "",
    conPassword: "",
    country: "",
    day: 0,
    month: "",
    year: 0,
  });
  const [inputError, setInputError] = useState({
    fullName: null,
    email: null,
    password: null,
    conPassword: null,
    country: null,
    day: null,
    month: null,
    year: null,
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const slideRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (eve: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = eve.currentTarget;
    setUserInputs((prevState) => ({ ...prevState, [name]: value }));
    clearInputError(name);
  };
  const clearInputError = (eID: string): void => {
    if (eID) {
      setInputError((prevState) => ({ ...prevState, [eID]: null }));
    }
  };
  const validateUserName = () => {
    const { fullName } = userInputs;
    const name = "fullName";
    if (!fullName) {
      handleError(name, "Please enter your full name");
      return;
    }
    if (fullName.length < 3) {
      handleError(name, "Name is too short");
      return;
    }
    if (!checkPattern(fullName)) {
      handleError(
        name,
        "Invalid name. Please enter alphabet, digit, space, underscore."
      );
      return;
    }
    return true;
  };
  const handleEmailValidation = () => {
    const name = "email";
    const { email } = userInputs;
    if (!email) {
      handleError(name, "Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      handleError(
        name,
        "Invalid email address. Please make sure you provide correct email address."
      );
      return;
    }
    return true;
  };

  const handlePasswordValidation = () => {
    const { password } = userInputs;
    const name = "password";
    if (!password) {
      handleError(name, "Please enter password");
      return;
    }

    if (!validatePassword(password)) {
      handleError(
        name,
        "Invalid password formate. You can use alphabets, digits, special symbols."
      );
      return;
    }
    return true;
  };

  const handleConfirmPwdValidation = () => {
    const name = "conPassword";
    const { conPassword, password } = userInputs;
    if (!conPassword) {
      handleError(name, "Please enter your confirm password.");
      return;
    }
    if (password !== conPassword) {
      handleError(name, "Wrong confirmation password.");
      return;
    }
    return true;
  };
  const handleValidateDOB = (eve?: React.FormEvent<HTMLInputElement> | any) => {
    const name = eve!.hasOwnProperty("currentTarget")
      ? eve.currentTarget.name
      : eve;
    const { day, month, year } = userInputs;
    if (!userInputs[name as keyof SignupTypes]) {
      handleError(name, `Please enter ${name}`);
      return;
    }

    if (name === "day") {
      if (day <= 0 || day >= 30) {
        handleError(name, `Can't find ${day} day. Please enter correct day.`);
        return;
      }
    }

    if (name === "month") {
      const findMonth = monthLists().find(
        (el) => el.toLowerCase() === month.toLowerCase()
      );
      if (!findMonth) {
        handleError(
          name,
          `Can't find ${month} month. Please enter correct month.`
        );
        return;
      }
    }
    if (name === "year") {
      if (year < 1970 || year >= new Date().getFullYear()) {
        handleError(
          name,
          `Can't find ${year} years. Please enter correct year`
        );
        return;
      }
    }
    return true;
  };

  const handleCountryValidation = async () => {
    const { data } = await ax.get(`/country/search/${userInputs.country}`);
    if (!data) {
      handleError("country", "Please provide the country name you living");
      return;
    }
    return true;
  };

  const handleError = (errID: string, msg: string): void => {
    if (errID && msg) {
      setInputError((prevState) => ({ ...prevState, [errID]: msg }));
    }
  };
  const handleSlide = () => {
    setCount((prevCount) => prevCount + 1);
    slideRef.current!.style.transform = `translateX(-${(100 * count) / 3}%)`;
  };

  const handleNext = async () => {
    if (count === 1) {
      const userName = validateUserName();
      if (userName) {
        const email = handleEmailValidation();
        if (email) {
          handleSlide();
        }
        return;
      }
    }

    if (count === 2) {
      const pwd = handlePasswordValidation();
      if (pwd) {
        const conPwd = handleConfirmPwdValidation();
        if (conPwd) {
          handleSlide();
        }
      }
      return;
    }

    if (count === 3) {
      const day = handleValidateDOB("day");
      if (day) {
        const month = handleValidateDOB("month");
        if (month) {
          const year = handleValidateDOB("year");
          if (year) {
            const country = await handleCountryValidation();
            if (country) {
              navigate("/signup/finished", { replace: false });
              const { data } = await ax.post("/signup", {
                data: {
                  fullName: userInputs.fullName,
                  email: userInputs.email,
                  password: userInputs.password,
                  dob: new Date(
                    `${userInputs.month} ${userInputs.day} ${userInputs.year}`
                  )
                    .toISOString()
                    .replace("T", " ")
                    .split(".")[0],
                  country: userInputs.country,
                },
              });
              if (data.status === 422) {
                setSignupSuccess(false);
                navigate("/signup", { replace: true });
                if (data.errorCode === "EMAIL_ALREADY_IN_USE") {
                  handleError(
                    "email",
                    "Email is already in use. Please try with another email."
                  );
                  setCount(1);
                  slideRef.current!.style.transform = "translateX(0%)";
                  return;
                }
                return;
              }
              setSignupSuccess(true);
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            }
          }
        }
      }
      return;
    }
  };

  const handleDatePick = (id: string, date: number | string) => {
    setUserInputs((prevState) => ({ ...prevState, [id]: date }));
    clearInputError(id);
  };

  const handleSelectCountry = (val: string) =>
    setUserInputs((prevState) => ({ ...prevState, country: val }));

  return (
    <FormWrapper>
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <FormHeader title="Sign Up" classNames="text-center" />
              <form className="flex flex-col w-full sm:px-20 z-2">
                <div
                  className="slider grid col-3 gap-20 transition-1"
                  style={{ width: `calc(100*3%)` }}
                  ref={slideRef}
                >
                  <InputGroup
                    classes={
                      count === 1 ? "visible" : "visibility-hidden opacity-0"
                    }
                  >
                    <Input
                      name="fullName"
                      type="text"
                      label="Full Name"
                      value={userInputs.fullName}
                      onInputChange={handleInputChange}
                      handleOnBlur={validateUserName}
                      error={inputError.fullName}
                      icon={<IoPerson />}
                    />
                    <Input
                      name="email"
                      type="text"
                      label="Email Address"
                      value={userInputs.email}
                      onInputChange={handleInputChange}
                      handleOnBlur={handleEmailValidation}
                      error={inputError.email}
                      icon={<IoMail />}
                    />
                  </InputGroup>
                  <InputGroup
                    classes={
                      count === 2 ? "visible" : "visibility-hidden opacity-0"
                    }
                  >
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      value={userInputs.password}
                      onInputChange={handleInputChange}
                      handleOnBlur={handlePasswordValidation}
                      error={inputError.password}
                      icon={<IoLockClosed />}
                    />
                    <Input
                      name="conPassword"
                      type="password"
                      label="Confirm Password"
                      value={userInputs.conPassword}
                      onInputChange={handleInputChange}
                      handleOnBlur={handleConfirmPwdValidation}
                      error={inputError.conPassword}
                      icon={<IoLockClosed />}
                    />
                  </InputGroup>
                  <InputGroup
                    classes={
                      count === 3 ? "visible" : "visibility-hidden opacity-0"
                    }
                  >
                    {count === 3 && (
                      <DateInput
                        day={userInputs.day}
                        month={userInputs.month}
                        year={userInputs.year}
                        onDatePicked={handleDatePick}
                        onBlur={handleValidateDOB}
                        error={{
                          day: inputError.day,
                          month: inputError.month,
                          year: inputError.year,
                        }}
                      />
                    )}
                    <div className="relative">
                      <Input
                        name="country"
                        type="text"
                        label="Select Country"
                        value={userInputs.country}
                        onInputChange={handleInputChange}
                        error={inputError.country}
                      />
                      {count === 3 && (
                        <SelectCountry
                          handleSelectCountry={handleSelectCountry}
                          value={userInputs.country}
                        />
                      )}
                    </div>
                  </InputGroup>
                </div>
                <div className="form_footer flex flex-col content-center py-20 my-20">
                  <input
                    type="button"
                    value={count < 3 ? "Next" : "Create Account"}
                    className={`py-10 px-50 font-semibold text-medium color-success rounded-lg border-2 border-gray-light hover-bg-fade cursor-pointer bg-transparent`}
                    onClick={handleNext}
                  />
                </div>
                <FormFooter path="/login" accountStatus="do" />
              </form>
            </React.Fragment>
          }
        ></Route>
        <Route path="/finished" element={<Loading success={signupSuccess} />} />
      </Routes>
    </FormWrapper>
  );
};

export default SignUp;
