const errorMsg = (user, description, usage = false) => {
    return {
        color: "#CD5E5C",
        author: {
            name: "We have encountered an error",
        },
        description: `・<:cross_error:886004482645843999>︰${description}${!usage ? "" : `\n\n**Usage**︰\`${usage}\``}`,
        footer: {
            text: `Executed by ${user.tag}`,
            icon_url: user.avatarURL(),
        }
    };
}

const successMsg = (user, description) => {
    return {
        color: "#70D9F3",
        author: {
            name: "Success!",
        },
        description: `・<:check_success:886004482570330192>︰${description}`,
        footer: {
            text: `Executed by ${user.tag}`,
            icon_url: user.avatarURL(),
        }
    };
}

const capitalizeFirstLetter = (string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { errorMsg, successMsg, capitalizeFirstLetter };