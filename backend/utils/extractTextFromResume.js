const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const extractTextFromResume = async (buffer, mimetype) => {
  try {
    let text = '';

    if (mimetype === 'application/pdf') {
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      throw new Error('Unsupported file type');
    }

    // Normalize whitespace and return clean text
    return text.replace(/\s+/g, ' ').trim();
  } catch (error) {
    throw new Error('Failed to extract text from resume: ' + error.message);
  }
};

module.exports = extractTextFromResume;
