import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class NoteService {
    async getAll(query = {}) {
        return await dbContext.Notes.find(query).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Notes.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Notes.create(rawData)
        return data
    }
    async edit(id, userEmail, update) {
        let data = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("InvalidID")
        }
        return data;
    }
    async delete(id, userEmail) {
        let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("InvalidID")
        }
    }
}

export const noteService = new NoteService()