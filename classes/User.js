const { User } = require("discord.js");
const Cacher = require("../helpers/Cacher");
const Request = require("../helpers/Requester");

/**
 * Creates a DOApi user
 * @param {User} user Discord user
 */
module.exports = async function User(user) {

    this.data = await Cacher.fetch(new Request(`user/${user.id}`)) ?? {};
    this.getDisplayName = function () {
        new Possibly({

            data: { ...this.data, id: user.id },
            string: function () { return this.data['displayName']; },
            orHandler: function (type) {

                switch (type) {

                    case "id":
                        this.string = function () { return this.data['displayName'] ?? this.data['id'] }
                        break;

                    default:
                        throw new TypeError(`Unknown or type '${type}'.`);
                        break;

                }

            }

        })
    }

}