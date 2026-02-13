const mongoose = require("mongoose");
const Permissions = require("./Permissions");

const schema = mongoose.Schema({
    role_name: {
        type: String,  // mongoose.SchemaTypes.String də yazmaq olar
        required: true,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        // required: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class Roles extends mongoose.Model {
    static async deleteOne(query) {
        if(query._id) {
            await Permissions.deleteMany({role_id: query._id});
        }

        await super.deleteOne(query);
    }
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);