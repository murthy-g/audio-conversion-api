const express = require('express');
const multer = require('multer');

const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();
const upload = multer();

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

async function transcribe(buffer) {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createTranscription(
        buffer, // The audio file to transcribe.
        "whisper-1", // The model to use for transcription.
        undefined, // The prompt to use for transcription.
        'json', // The format of the transcription.
        1, // Temperature
        'en' // Language
    )
    return response;
}

router.post("/whisper", upload.any('file'), (req, res) => {
    console.log('here');
    audio_file = req.files[0];
    buffer = audio_file.buffer;
    buffer.name = audio_file.originalname;
    const response = transcribe(buffer);
    response.then((data) => {
        console.log(data);
        res.send({ 
            type: "POST", 
            transcription: data.data.text,
            audioFileName: buffer.name
        });
    }).catch((err) => {
        console.log(err);
        res.send({ type: "POST", message: err });
    });
});

module.exports = router;