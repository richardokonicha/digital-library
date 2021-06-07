import React from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import { useRouter } from "next/router"

// interface ThumbnailExampleProps {
//     fileUrl: string;
// }

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const HomePage = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const router = useRouter()
    const {
        query: { uri },
    } = router
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    return (
        <>

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.js">
                {/* <Thumbnails /> */}

                <div
                    style={{
                        height: '750px',
                        width: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: "100px"
                    }}
                >
                    <Viewer
                        fileUrl={uri}
                        plugins={[
                            defaultLayoutPluginInstance,
                            // thumbnailPluginInstance,

                        ]}
                    />
                </div>
            </Worker>

        </>
        // <Viewer
        //     fileUrl="/pdf-open-parameters.pdf"
        //     plugins={[
        //         defaultLayoutPluginInstance,
        //         // thumbnailPluginInstance,

        //     ]}
        // />
    );
};

export default HomePage;