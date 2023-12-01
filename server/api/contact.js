export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    console.log("the body", body);
    const options = {
        method: "POST",
        url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "ae5381ecc8msh0f57ec82fa1bea2p1bb060jsn95500a02d0b4",
            "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
        },
        data: `{"personalizations":[{"to":[{"email":"jobtennis21@gmail.com"}],"subject":" ${body.name} - ${body.phone}: ${body.subject}"}],"from":{"email":"${body.email}"},"content":[{"type":"text/plain","value":"${body.message}"}]}`,
    };

    try {
        const res = await $fetch(options.url, {
            method: "POST",
            headers: options.headers,
            body: options.data,
        });

        return {
            message: "message sent",
        };
    } catch (err) {
        throw createError({
            statusCode: 400,
            statusMessage: "message not sent" + err,
        });
    }

    /*
        .then((res) => {
            console.log("good");

            return {
                hello: "world"
            }
        })
        .catch((err) => {
            console.log("baddd", err);
            throw createError({
                statusCode: 400,
                statusMessage: "message not sent",
            });
        });
*/
});