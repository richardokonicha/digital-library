import React from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
    
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const HomePage = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.js">
                <Thumbnails />

            <div
                style={{
                    height: '750px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Viewer
                    fileUrl="https://dl.airtable.com/.attachments/d350ec0a6e168c1d5e3759c142ee6eb1/9bed5ceb/Summary1.pdf"
                    plugins={[
                        // defaultLayoutPluginInstance,
                        thumbnailPluginInstance,

                    ]}
                />
            </div>
        </Worker>
    );
};
  
export default HomePage;