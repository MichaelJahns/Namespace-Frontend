export default function validateFifthEdition(values) {
    let errors = {};
    // Name
    if (!values.name) {
        errors.name = "Required Name";
    }
    if (values.title) {
        if (values.title.length >= 200) {
            errors.title = "Title is way too long"
        }
    }
    // Missing Fields Errors
    if (!values.notes) {
        errors.notes = "Required Field";
    }
    // regex can be used here
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {

    return errors;
}