import React, {useState} from "react";
import validateAuth from "../utils/validators/validateAuth"
import{useAuth} from "../utils/useAuth";


import axios from 'axios';

function useFormValidation(initialState) {
    const [values, setValues] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);


    const [serverError, setServerError] = useState(null);

    const {setUser} = useAuth();

    React.useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                setSubmitting(false)
            } else {
                setSubmitting(false);
            }
        }
    }, [values, errors, isSubmitting]);

    function handleLogin(event) {
        console.log("attempting login")
        const validationErrors = validateAuth(values);
        setErrors(validationErrors);
        setSubmitting(true);
        login(values);
    }

    function handleSignUp(event) {
        const validationErrors = validateAuth(values);
        setErrors(validationErrors);
        setSubmitting(true);
        signup(values);
    }

    const getUser = (data) =>{
        axios.defaults.baseURL = "https://us-central1-namespace-fa5e1.cloudfunctions.net/api"
        axios
        .post('/getUser', data)
        .then(response => {
            switch(response.status) {
                case 200:
                 console.log("response")
                  break;
                case 201:
                  console.log("character created")
                  break;
                default:
                  console.log("Unhandled exception")
              }
        })
        .catch(error => {
            console.log(error);
        });
    }
    const signup = (data) => {
            axios.defaults.baseURL = "https://us-central1-namespace-fa5e1.cloudfunctions.net/api"
            axios
                .post('/createUser', data)
                .then(response => {
                    switch(response.status) {
                        case 200:
                         console.log("response but no new character")
                         setServerError(response.data.error)
                          break;
                        case 201:
                          console.log("character created")
                          setUser(response.data.token)
                          break;
                        default:
                          console.log("Unhandled exception")
                      }
                })
                .catch(error => {
                    setServerError(error.message)
                });
        }

        const login = (data) => {
            axios.defaults.baseURL = "https://us-central1-namespace-fa5e1.cloudfunctions.net/api"
                axios
                    .post('/login', data)
                    .then(response => {
                        setUser(response.data.token);
                    })
                    .catch(error => {
                        setServerError(error.message)
                    });
            }
        

    function handleChange(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    function handleBlur(event) {
        const validationErrors = validateAuth(values);
        setErrors(validationErrors);
    }

    return {
        getUser,
        handleLogin,
        handleSignUp,
        handleChange,
        handleBlur,
        values,
        errors,
        isSubmitting,
        serverError
    }
}

export default useFormValidation;