
declare const pdfjsLib: any;

// Configure PDF.js Worker Source to resolve "Deprecated API usage" warning
// Using version 3.11.174 to match the library version in index.html
if (typeof window !== 'undefined' && 'pdfjsLib' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export const extractTextFromPdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += strings.join(' ') + '\n';
  }

  return fullText;
};

export const parseContactInfo = (text: string) => {
  const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  
  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);
  
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const name = lines[0] || "Unknown Candidate";

  return {
    name,
    email: emailMatch ? emailMatch[0] : 'N/A',
    phone: phoneMatch ? phoneMatch[0] : 'N/A'
  };
};
