import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";


import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }
      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate("/");
    }
  };
  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              
              <EuiFlexItem>
                <EuiImage src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAAz1BMVEX///80qFP7vARChfQZZ9IYgDjqQzX2rac3qVb8/vz1+/fs9+8+rFscgTf7vgxNs2lHsGMchjyw3bzi8+fK6NLA5MrZ79+KzZx9x5E7iTAjgzXltglkvHv8xCP8zD/81F/+6Kn//PP93oL+8MhtwYSa1Kl3xYxauHNqv4HwuQcijkIqmkknlkaU0aSj2LEvddZIhtuMs+nU4vdelN+iwu10oELCrRGfoxlzmCNUjyrYswy3qhSQoBxmlCZGjC7NsA6ppheCnCDGuDZOqWg/pFv4T1P5AAAD4klEQVR4nO3ceVfTQBQF8Ew0kC6k7BTKUhGKiFRARXFDxe//maRla9M3S6e8ydzju//2HM79kb6ZBE4mSSQSiUQikUgkEolEIpFIJBKXzKcs2dnd674K0n+OBzBIsc9PmJ9jBNxeh9f8/VkBadFl788LSAvOazDszwxId/jm4K4/NyDdZ+7PDiiYLsFDf3ZA2uXtzw/Y4+3PD9jl7c8P2OHtzw9IefsDAsb74wFK/eEA5f6VAmrLB61Wb22m/lUCVo7UMAf1GfpXCFhdVPc5mKF/dYDlXD3G8VtE9a8KUGurkbhdArJ/RYDG9mh/1fLvXw1gvaXG49+/EsBaU00N0PWvAnBYru8A0PYPD6j3JvtbAfr+wQEPu9dUAEP/0ICn3WsKgKl/YMDo7uUMMPYPCqht0PXNAHP/kIDGG11/E8DSPyBgYvdyAtj6hwNM7l4uAGv/YIBDzfiaAfb+gQD1tqm+FuDQPwygQe5eVoBL/yCAdXr3sgGc+ocA6HYvC8CtPz+gOLXWJwGO/fn/P/DJoT8BcO3PDehsZn6AF67RLGAOcel/uZVBAz4vZMiA4kuWIQOOrzJowNfNDBrwbSuDBgzHFxdwP76wgM5VBg14HF9QwNP4YgK+L2TIgOMfWTlQgM7Pif5QgOvNyf5IgPL4ogF+U/VxAMT4QgGo8UUCXJNffxzAr/LuBQbQjC8KQDu+IAD9+GIALvXjCwEwjS8AoDCOb/yA4yt7/5gBHermEwhg2H0hAH+s4xs54Matf7wA9RcdoHKnL1HEAJUvgQOUeosOcBBEDlDv0AHqBB2gTsyjHD9AKaMAAWAUQABMixEGwLAYgQDUie6+AgWgXYxgALpRBgLQo4wEIAVQAGoxwgIQixEYYHKU4QDlQcADlASAgPFRRgSMPeRAAkbvKzABI4sRKuBRAAt4WIxwAfeLETDg7r7CD/DSNS4/3j+DP55CA1RzCRygmjfgAKX83qGJCOD3FlNMgGTV9BolAiBZMbzICgEoH4SBBygdRQIIIE+TwAIka4bFCAKgO5IBB2BYjEAASV13rgEKQLsYwQCSpE+OMhCAPp4BCUC+YQ8FoM44wAIQZySBAZJa6SEnRwOUDxo6wgOMP+S0AQFj9xXriICRh5xT4lMAQFLbGA5C3qc+RADc7mmHvXa/QX6EATBEAM+WRT/A+2gA236As2gAPT/AeTSAZT/ARSyAnF4l7fkQCWDDs7/zJWDu3/S9AEnyMQZAPtW55KW4zTEvgLzNed5rwFm/Ocvvf5ALh0lm7N9embH/gHB+ZtmTmcovbvefob5EIpFIJBKJRCKRSCQSieQ/yT/g88eK23cbXwAAAABJRU5ErkJggg=="} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>Google Meet</EuiTextColor>
                    <EuiTextColor color="#0b5cff">  - Online Video Calls, Meetings and Conferencing</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;
