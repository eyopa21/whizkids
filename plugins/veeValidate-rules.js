import { defineRule } from "vee-validate";
import * as AllRules from '@vee-validate/rules';
import { email, required, min, max } from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {


    console.log("vee validate");
    defineRule("email", (value) => {
        if (email(value) && required(value)) {
            return true;
        }

        return "Please enter a Valid email";
    });
    defineRule('minLength', (value, [limit]) => {
        // The field is empty so it should pass
        if (!value || !value.length) {
            return true;
        }
        if (value.length < limit) {
            return `This field must be at least ${limit} characters`;
        }
        return true;
    });
    defineRule("password", (value) => {
        if (
            required(value) &&
            min(value, { length: 6 }) &&
            max(value, { length: 10 })
        ) {
            return true;
        }

        return "Password must be 6 - 10 characters";
    });
    defineRule("confirmPassword", (value, [target], ctx) => {
        if (required(value) && value === ctx.form[target]) {
            return true;
        }

        return "Passwords must match";
    });
    defineRule("required", (value, _, ctx) => {
        if (value && value.trim()) {
            return true;
        }
        return `${ctx.field} is required`;
    });
    defineRule("minmax", (value) => {
        if (
            required(value) &&
            min(value, { length: 10 }) &&
            max(value, { length: 100 })
        ) {
            return true;
        }
        return "Minimum 10 characters is needed";
    });
    defineRule("number", (value, [min, max], ctx) => {
        if (parseInt(value) > min && parseInt(value) < max) {


            return true;
        }

        return `The value must be between ${min} and ${max}`
    })
    defineRule('confirmed', (value, [target]) => {
        if (value === target) {
            return true;
        }
        return 'Passwords must match';
    });


});

//number: [10, 20]