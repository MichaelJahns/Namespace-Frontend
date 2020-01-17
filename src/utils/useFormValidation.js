import React from "react";

function useFormValidation(initialState, validate, firebase) {
    const [values, setValues] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);

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

    function handleSignIn(event) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
        const { email, password } = values;

        console.log("Attempting signin")
        firebase.login(email, password);
    }

    function handleSignUp(event) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
        const { email, password } = values;
        firebase.signup2(email, password)
    }

    function handleChange(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    function handleBlur(event) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    return {
        handleSignIn,
        handleSignUp,
        handleChange,
        handleBlur,
        values,
        errors,
        isSubmitting
    }
}

export default useFormValidation;