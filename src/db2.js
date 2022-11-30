const axios = require("axios");

class DB2Class {

     // Create he Axios client.
    static client = axios.create({
            baseURL: process.env.URL,
            auth: { username: "ibmuser", password: "sys1" },
            headers: {
                "Content-Type": "application/json"
            }
        });
    
    /**
    * Create a new user.
    */
    static async create(user) {

        // Check if object is null.
        if (!user)
            throw new Error("The object user is mandatory");

        // Check if the parameter "firstname" is null or empty.
        if (!user.firstname || user.firstname.trim().length == 0)
            throw new Error("The parameter .firstname is mandatory");

        // Check if the parameter "lastname" is null or empty.
        if (!user.lastname || user.lastname.trim().length == 0)
            throw new Error("The parameter .lastname is mandatory");

        // Check if the parameter "email" is null or empty.
        if (!user.email || user.email.trim().length == 0)
            throw new Error("The parameter .email is mandatory");

        // Set a empty value for the "domain" field.
        user.domain = "";

        try {

            // Call DB2Connect to insert a new user [with await].
            // Note: the path to call is "[POST] /services/techgym/insert".
            await this.client.post("/insert", user);

        } catch (err) {

            // Check if the error is of type Axios.
            if (!axios.isAxiosError(err))
                throw err;

            // Check the databse error type.
            // NOTE: If there is a duplication of the primary key the description will contain the "SQLCODE=-803" and the status code will be 500.
            // Check the fields "err.response.status" and "err.response.data.StatusDescription".
            if (err.response.status == 500 && err.response.data.StatusDescription.indexOf("-803") != -1)
                throw new Error(`The user with email "${user.email}" already exist`);

            // Otherwise throws a generic error.
            throw err;
        }
    }

    static async findAll() {

        // Call DB2Connect to get all the users [with await].
        // Note: the path to call is "[POST] /services/techgym/findall".
        const { data } = await this.client.post("findall");

        // Return the result in the field "ResultSet Output"
        return data["ResultSet Output"];
    }

    static async findByEmail(email) {

        // Check if the email parameter is null or empty.
        if (!email || email.trim().length == 0)
            throw new Error("The parameter email is mandatory");

        // Call DB2Connect to find and return the user by email. [with await].
        // Note: the path to call is "[POST] /services/techgym/findbyemail".
        const { data } = await this.client.post("findbyemail", { "email": email });

        // Check if the user exist.
        if (data["ResultSet Output"].length == 1)
            return data["ResultSet Output"][0];

        // If the user doesn't exist, return null.
        return null;
    }

    static async delete(email) {

        // Check if the email parameter is null or empty.
        if (!email || email.trim().length == 0)
            throw new Error("The parameter email is mandatory");

        // Call DB2Connect to find and return the user by email. [with await].
        // Note: the path to call is "[POST] /services/techgym/deletebyemail".
        const { data } = await this.client.post("deletebyemail", { "email": email });

        // Check if the user has been deleted.
        // NOTE: Use the field "Update Count" to count the number of row deleted.
        if (data["Update Count"] == 1)
            return true;

        return false;
    }

    static async update(email, firstname, lastname) {

        // Check if the email parameter is null or empty.
        if (!email || email.trim().length == 0)
            throw new Error("The parameter email is mandatory");

        // Check if the "firstname" and "lastname" parameters are null or empty. 
        if ((!firstname || firstname.trim().length == 0) || (!lastname || lastname.trim().length == 0))
            throw new Error('The fields "firstname" and "lastname" must not be null');

        // Create an empty object where will be stored the email, firstname and lastname values.
        let updateObject = { "email": email, "firstname": firstname, "lastname": lastname };

        // Call DB2Connect to update a new user by email [with await].
        // Note: the path to call is "/services/techgym/update".
        const { data } = await this.client.post("/update", updateObject);

        // Check if the user's fields has been updated.
        // NOTE: Use the field "Update Count" to count the number of row updated.
        if (data["Update Count"] == 1) {

            // Use the method .findByEmail to get the user with the new valuse [with await].
            return await this.findByEmail(email);
        }

        // Return null because the user was not updated
        return null;
    }
}

module.exports = DB2Class;