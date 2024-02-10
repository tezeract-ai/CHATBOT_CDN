import React, { useState } from "react";
import { dispatch, useSelector } from "../../../redux/store";
import { setStorageItem, validateEmail } from "../../../utils";
import { useSnackbar } from "notistack";
import { signIn } from "../../../redux/actions/authActions";
import SignInView from "./view";

const SignIn = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emaiIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailOnchange = (e) => {
    setEmail(e.target.value);
    const res = validateEmail(e.target.value);
    if (res) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };
  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    if (!isEmailDirty || !isPasswordDirty) {
      enqueueSnackbar(`Please enter ${!isEmailDirty ? "Email" : "Password"} `, {
        autoHideDuration: 3000,
        variant: "warning",
      });
    }

    try {
      if (emaiIsValid && passwordIsValid) {
        const res = await dispatch(signIn({ email, password }));
        if (res?.data?._id) {
          enqueueSnackbar("Login successfully", {
            autoHideDuration: 3000,
            variant: "success",
          });

          await setStorageItem("user", res?.data);
        } else {
          enqueueSnackbar(`${res?.message}`, {
            autoHideDuration: 3000,
            variant: "error",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginPageProps = {
    isLoading,
    password,
    isPasswordDirty,
    setIsPasswordDirty,
    passwordIsValid,
    showPassword,
    emaiIsValid,
    setIsEmailDirty,
    isEmailDirty,
    email,
    handleClickShowPassword,
    handleEmailOnchange,
    handleMouseDownPassword,
    handlePasswordOnChange,
    handleSubmit,
  };

  return <SignInView {...loginPageProps} />;
};

export default SignIn;
