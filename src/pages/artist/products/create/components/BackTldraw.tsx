import { Box, Button } from '@mui/joy'
import React, { useState } from 'react'
import { AssetRecordType, Editor, Tldraw } from 'tldraw'
import { SupplierProduct } from '../../../../../models/supplierProduct';

interface FrontProps {
    setEditor: (editor: any) => void;
    editor: Editor | null;
    selectedProduct: SupplierProduct;
    backImage: string;
}

const BackTldraw: React.FC<FrontProps> = ({ selectedProduct, backImage }) => {

    const [editor, setEditor] = useState<Editor | null>(null)

    interface Dimensions {
        width: number;
        height: number;
    }

    function resizeImage(originalWidth: number, originalHeight: number, newWidth: number): Dimensions {
        const aspectRatio = originalHeight / originalWidth;
        const newHeight = Math.round(newWidth * aspectRatio);

        return { width: newWidth * 0.9, height: newHeight * 0.9 };
    }

    interface Position {
        x: number;
        y: number;
    }

    function centerImage(areaWidth: number, areaHeight: number, imageWidth: number, imageHeight: number): Position {
        const x = (areaWidth - imageWidth) / 2;
        const y = (areaHeight - imageHeight) / 2;

        return { x, y };
    }

    const handleFileChangeBack = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();

            // Define what happens when the file is read
            reader.onloadend = () => {
                const base64String = reader.result as string; // Set the Base64 string
                const assetId = AssetRecordType.createId();

                // Extract MIME type and file name from the file object
                const mimeType = file.type; // e.g., 'image/png', 'image/jpeg'
                const fileName = file.name; // Extract the file name

                // Create an image object to load and get dimensions (width, height)
                const img = new Image();
                img.onload = () => {
                    const imageWidth = img.width;   // Get image width
                    const imageHeight = img.height; // Get image height

                    const newWidth: number = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.width as number

                    const newDims = resizeImage(img.width, img.height, newWidth);

                    // Create the asset in the editor with the actual width, height, and file name
                    editor?.createAssets([
                        {
                            id: assetId,
                            type: 'image',
                            typeName: 'asset',
                            props: {
                                name: fileName, // Use the file name as the name
                                src: base64String, // Use the Base64 string as the image source
                                w: newDims.width, // Use the actual image width
                                h: newDims.height, // Use the actual image height
                                mimeType: mimeType, // Dynamically set the MIME type
                                isAnimated: false
                            },
                            meta: {},
                        },
                    ]);

                    const areaWidth: number = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.width as number
                    const areaHeight: number = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.height as number

                    const areaLeft = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.left as number;
                    const areaTop = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.top as number;

                    const position = centerImage(areaWidth, areaHeight, newDims.width, newDims.height);

                    // Create the shape with the dynamic width and height
                    editor?.createShape({
                        type: 'image',
                        // Let's center the image in the editor
                        x: position.x + areaLeft,
                        y: position.y + areaTop,
                        props: {
                            assetId,
                            w: newDims.width, // Dynamically set width
                            h: newDims.height, // Dynamically set height
                        },
                    });
                };

                // Load the image from the Base64 string to get its dimensions
                img.src = base64String;
            };

            reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
        }
    };

    return (
        <Box>
            <input
                type="file"
                accept="image/*" // Accepts only image files
                onChange={handleFileChangeBack} // Handles file change
                style={{ display: 'none' }} // Hide the input
                id="file-input" // Unique ID for label
            />
            <label htmlFor="file-input">
                <Button
                    variant="plain"
                    color="neutral"
                    component="span" // Use 'span' for proper styling
                    size="sm"
                    sx={{
                        alignSelf: 'center',
                        margin: 1,
                    }}
                >
                    UPLOAD IMAGE BACK
                </Button>
            </label>
            <div style={{ position: 'relative', width: '900px', height: '900px', zIndex: '1', background: 'white' }}>
                <div style={{
                    position: 'absolute', top: 0, left: 50, width: '800px', height: '800px', zIndex: '2',
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: 'cover',
                }}></div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: '4' }}>
                    <Tldraw hideUi key='back'
                        onMount={(editor) => {
                            const myCameraOptions = { isLocked: true }
                            editor.setCameraOptions(myCameraOptions)
                            setEditor(editor)
                        }}
                    />
                </div>
                {/* Red Border Square */}
                <div style={{
                    position: 'absolute',
                    top: selectedProduct.supplierProductBounds?.find(bound => bound.type === 'back')?.top, // Position from the top 50%
                    left: selectedProduct.supplierProductBounds?.find(bound => bound.type === 'back')?.left, // Position from the left 50%
                    width: selectedProduct.supplierProductBounds?.find(bound => bound.type === 'back')?.width, // Width of the square
                    height: selectedProduct.supplierProductBounds?.find(bound => bound.type === 'back')?.height, // Height of the square
                    border: '2px dashed #efba0b', // Red border with 5px thickness
                    backgroundColor: 'transparent', // Make background transparent
                    transform: 'translate(-50%, -50%)', // Center the square
                    zIndex: '5', // Ensure it appears above other layers
                    pointerEvents: 'none' // Allow clicks to pass through
                }}></div>
            </div>
        </Box>
    )
}

export default BackTldraw