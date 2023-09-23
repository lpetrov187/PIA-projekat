import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from 'src/models/report';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor(private http: HttpClient) {}

  generateAndDownloadPdf(selected: Report): void {
    // Define the content of your PDF using pdfmake
    const docDefinition = {
      content: [
        { text: 'Hello world', fontSize: 16 }
        // Add more content as needed
      ]
    };

    // Make an HTTP POST request to your server to generate the PDF
    this.http.post('/api/generate-pdf', docDefinition, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a Blob object from the response
        const blob = new Blob([response], { type: 'application/pdf' });

        // Create a download link and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'example.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error generating or downloading PDF:', error);
      }
    );
  }
}
