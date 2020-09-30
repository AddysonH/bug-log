import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class BugService {
    async getAll(userEmail) {
        return await dbContext.Bugs.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid Id")
        }
        console.log(`I'm getting one bug:${data}`)
        return data
    }

    async create(rawData) {
        let data = await dbContext.Bugs.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        // FIXME find the bug and check if closed before updating
        for (const property in update) {
            console.log(`EDIT: ${property}: ${update[property]}`);
        } let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        if (data["closed"] == false) {
            console.log("edit I'm not closed")
            data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
            if (!data) {
                throw new BadRequest("Invalid ID");
            }
        }

        console.log(`returning data:${data}`)
        return data;
    }
    async delete(id, userEmail, update) {
        // FIXME don't remove the bug change its closed to true
        update = { closed: true }
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        console.log(`delete: ${data}`)
        if (!data) {
            throw new BadRequest("InvalidID")
        }
        //update
    }
}

export const bugService = new BugService()