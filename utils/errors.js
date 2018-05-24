
class InvalidArgumentError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, InvalidArgumentError);
    }
}

class NoteUnavailableError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, NoteUnavailableError);
    }
}

module.exports = {
    InvalidArgumentError,
    NoteUnavailableError
}