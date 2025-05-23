import { Box, Button, CircularProgress, Divider, Input, LinearProgress, Typography } from '@mui/joy'
import { createContext, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
    Tldraw, useEditor,
    track, useValue,
    TLComponents,
    useReactor,
    AssetRecordType,
    Editor,
    exportAs,
    getSvgAsImage,
    exportToBlob,
    Box as TlBox
} from 'tldraw'
import 'tldraw/tldraw.css'
import { Asset, ProductAsset, ProductColourDto, ProductCreateDto, ProductSizeDto } from '../../../../models/product'
import { useApi } from '../../../../context/api/ApiContext'
import { urlAssets, urlProductAssets, urlProducts, urlSupplierProductLines } from '../../../../endpoints'
import { Supplier, SupplierProduct, SupplierProductLine } from '../../../../models/supplierProduct'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from '../../../../context/snackbar/SnackbarContext'
import { Select, Option } from '@mui/joy';
import ProductCard from '../../../customer/product/ProductCard'
import { useNavigate } from 'react-router-dom'

export function resizeImage(originalWidth: number, originalHeight: number, newWidth: number): Dimensions {
    const aspectRatio = originalHeight / originalWidth;
    const newHeight = Math.round(newWidth * aspectRatio);

    return { width: newWidth * 0.9, height: newHeight * 0.9 };
}

export interface Dimensions {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

export function centerImage(areaWidth: number, areaHeight: number, imageWidth: number, imageHeight: number): Position {
    const x = (areaWidth - imageWidth) / 2;
    const y = (areaHeight - imageHeight) / 2;

    return { x, y };
}

const focusedEditorContext = createContext(
    {} as {
        focusedEditor: Editor | null
        setFocusedEditor(id: Editor | null): void
    }
)

interface MultipleExampleProps {
    setEditor?: (editor: any) => void;
    editor?: Editor | null;
    selectedProduct: SupplierProduct | null;
    frontImage: string;
    backImage: string;
    setShapesFront: (editor: any) => void;
    setShapesBack: (editor: any) => void;
}

// Define an interface for the exposed methods
export interface MultipleExampleHandle {
    resetShapes: () => void;
    getShapesFromEditors: () => any[];
}

// export const MultipleExample: React.FC<MultipleExampleProps> = ({ selectedProduct, frontImage, backImage, setShapesFront, setShapesBack }) => {

export const MultipleExample = forwardRef<MultipleExampleHandle, MultipleExampleProps>(({ selectedProduct, frontImage, backImage, setShapesFront, setShapesBack }, ref) => {

    // The function to reset shapes
    const resetShapes = () => {
        getShapesFromEditors()
    };

    // Use useImperativeHandle to expose the resetShapes method to the parent
    useImperativeHandle(ref, () => ({
        resetShapes,
        getShapesFromEditors
    }));


    const [focusedEditor, _setFocusedEditor] = useState<Editor | null>(null)

    const setFocusedEditor = useCallback(
        (editor: Editor | null) => {
            if (focusedEditor !== editor) {
                if (focusedEditor) {
                    focusedEditor.blur()
                }
                if (editor) {
                    editor.focus()
                }
                _setFocusedEditor(editor)
            }
        },
        [focusedEditor]
    )

    const editorC = (window as any).EDITOR_C;
    const editorD = (window as any).EDITOR_D;

    function getGraphicsFromEditor(editor: Editor | null, editorName: string) {
        if (editor) {
            const shapes: any[] = editor.store.allRecords();
            //console.log(`Shapes for editor ${editorName}:`, shapes);
            return shapes;
        }
        return [];
    }

    function getShapesFromEditors() {
        const shapesC = getGraphicsFromEditor(editorC, 'C');
        const shapesD = getGraphicsFromEditor(editorD, 'D');

        setShapesFront(shapesC)
        setShapesBack(shapesD)

        return [shapesC, shapesD]
    }

    const focusName =
        focusedEditor === (window as any).EDITOR_A
            ? 'A'
            : focusedEditor === (window as any).EDITOR_B
                ? 'B'
                : focusedEditor === (window as any).EDITOR_C
                    ? 'C'
                    : focusedEditor === (window as any).EDITOR_D
                        ? 'D'
                        : 'none'

    return (
        <Box
            sx={{ height: 'auto' }}
            // Sorry you need to do this yourself
            onPointerDown={() => setFocusedEditor(null)}
        >
            <focusedEditorContext.Provider value={{ focusedEditor, setFocusedEditor }}>
                {/* <h1>Focusing: {focusName}</h1> */}
                {(selectedProduct?.frontBack === 'front' || selectedProduct?.frontBack === 'both') &&
                    <>
                        {/* <Button sx={{
                            bgcolor: '#fcd157',
                            color: 'black',
                            '&:hover': {
                                bgcolor: '#d4a847',
                            },
                        }} onClick={() => getShapesFromEditors()}>Continue to Product Info</Button> */}
                        <Box
                            sx={{
                                //width: '100vw',
                                minHeight: '30vh',
                                display: 'flex',            // Use flexbox
                                flexDirection: 'column',    // Stack items vertically
                                alignItems: 'center',       // Center horizontally
                                justifyContent: 'center',
                                marginBottom: '2vh'    // Center vertically
                            }}
                        >
                            {selectedProduct ?
                                <>
                                    <Box
                                        sx={{
                                            //width: '100vw',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                //width: '100vw',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <EditorC selectedProduct={selectedProduct} image={frontImage} />
                                        </Box>
                                    </Box>
                                </>
                                :
                                <>
                                    <Box>Keen AF to design with you...select a product</Box>
                                </>}

                        </Box>
                    </>}
                {(selectedProduct?.frontBack === 'back' || selectedProduct?.frontBack === 'both') &&
                    <>
                        <Box
                            sx={{
                                //width: '100vw',
                                minHeight: '30vh',
                                display: 'flex',            // Use flexbox
                                flexDirection: 'column',    // Stack items vertically
                                alignItems: 'center',       // Center horizontally
                                justifyContent: 'center',
                                marginBottom: '2vh'    // Center vertically
                            }}
                        >
                            {selectedProduct ?
                                <>
                                    <Box
                                        sx={{
                                            //width: '100vw',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                //width: '100vw',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <EditorD selectedProduct={selectedProduct} image={backImage} />
                                        </Box>
                                    </Box>
                                </>
                                :
                                <>
                                    <Box>Keen AF to design with you...select a product</Box>
                                </>}
                        </Box>
                    </>}

            </focusedEditorContext.Provider>
        </Box>
    )
});

interface EditorProps {
    setEditor?: (editor: any) => void;
    editor?: Editor | null;
    selectedProduct: SupplierProduct | null;
    image: string;
}

// front
const EditorC: React.FC<EditorProps> = ({ selectedProduct, image }) => {
    const { setFocusedEditor, focusedEditor } = useContext(focusedEditorContext)

    const handleFileChangeFront = (event: React.ChangeEvent<HTMLInputElement>) => {
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

                    console.log(img.width)
                    console.log(img.height)

                    const newWidth: number = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.width as number

                    console.log(newWidth)

                    const newDims = resizeImage(img.width, img.height, newWidth);
                    // Create the asset in the editor with the actual width, height, and file name
                    focusedEditor?.createAssets([
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

                    const areaWidth: number = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.width as number
                    const areaHeight: number = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.height as number

                    const areaLeft = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.left as number;
                    const areaTop = selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.top as number;

                    const position = centerImage(areaWidth, areaHeight, newDims.width, newDims.height);

                    // Create the shape with the dynamic width and height
                    focusedEditor?.createShape({
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
        <>
            <div
                tabIndex={-1}
                onFocus={() => setFocusedEditor((window as any).EDITOR_C)}
            >
                <Box>
                    <Box>
                        <Typography sx={{ p: 1 }}>FRONT</Typography>
                        <Box sx={{
                            marginBottom: 2,
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChangeFront}
                                style={{ display: 'none' }}
                                id="file-input-front"
                            />
                            <label htmlFor="file-input-front">
                                <Button
                                    variant="plain"
                                    color="neutral"
                                    component="span"
                                    size="sm"
                                    sx={{
                                        alignSelf: 'center',
                                        margin: 1,
                                        bgcolor: '#fcd157',
                                        color: 'black',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                    }}
                                >
                                    UPLOAD IMAGE FRONT
                                </Button>
                            </label>
                        </Box>
                    </Box>
                    <div style={{ position: 'relative', width: '900px', height: '900px', zIndex: '1', background: 'white' }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 50, width: '800px', height: '800px', zIndex: '2',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                        }}></div>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: '4' }}>
                            <Tldraw hideUi
                                // persistenceKey="front"
                                className="C"
                                autoFocus={false}
                                onMount={(editor) => {
                                    ; (window as any).EDITOR_C = editor
                                    setFocusedEditor(editor)

                                    const myCameraOptions = { isLocked: true }
                                    editor.setCameraOptions(myCameraOptions)
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.top}px`,
                                left: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.left}px`,
                                width: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.width}px`,
                                height: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'front')?.height}px`,
                                border: '2px dashed #efba0b', // Red border with 5px thickness
                                backgroundColor: 'transparent', // Make background transparent
                                zIndex: '5', // Ensure it appears above other layers
                                pointerEvents: 'none'
                            }}></div>
                        </div>
                    </div>
                </Box >
            </div >
        </>
    )
}

const EditorD: React.FC<EditorProps> = ({ selectedProduct, image }) => {
    const { setFocusedEditor, focusedEditor } = useContext(focusedEditorContext)

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
                    focusedEditor?.createAssets([
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
                    focusedEditor?.createShape({
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
        <>
            <div
                tabIndex={-1}
                onFocus={() => setFocusedEditor((window as any).EDITOR_D)}
            >
                <Box>
                    <Box>
                        <Typography sx={{ p: 1 }}>BACK</Typography>
                        <Box sx={{
                            marginBottom: 2,
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChangeBack}
                                style={{ display: 'none' }}
                                id="file-input-back"
                            />
                            <label htmlFor="file-input-back">
                                <Button
                                    variant="plain"
                                    color="neutral"
                                    component="span" // Use 'span' for proper styling
                                    size="sm"
                                    sx={{
                                        alignSelf: 'center',
                                        margin: 1,
                                        bgcolor: '#fcd157',
                                        color: 'black',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                    }}
                                >
                                    UPLOAD IMAGE BACK
                                </Button>
                            </label>
                        </Box>
                    </Box>
                    <div style={{ position: 'relative', width: '900px', height: '900px', zIndex: '1', background: 'white' }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 50, width: '800px', height: '800px', zIndex: '2',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                        }}></div>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: '4' }}>
                            <Tldraw hideUi
                                // persistenceKey="back"
                                className="D"
                                autoFocus={false}
                                onMount={(editor) => {
                                    ; (window as any).EDITOR_D = editor
                                    setFocusedEditor(editor)

                                    const myCameraOptions = { isLocked: true }
                                    editor.setCameraOptions(myCameraOptions)
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.top}px`, // Position from the top 50%
                                left: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.left}px`, // Position from the left 50%
                                width: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.width}px`, // Width of the square
                                height: `${selectedProduct?.supplierProductBounds?.find(bound => bound.type === 'back')?.height}px`, // Height of the square
                                border: '2px dashed #efba0b', // Red border with 5px thickness
                                backgroundColor: 'transparent', // Make background transparent
                                zIndex: '5', // Ensure it appears above other layers
                                pointerEvents: 'none'
                            }}></div>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}

// Define an interface for the child component methods
export interface ChildHandle {
    triggerChildFunction: () => void;
}

const CreateProduct = () => {

    // Create a ref for the MultipleExample child component
    const multipleExampleRef = useRef<MultipleExampleHandle>(null);

    // Trigger resetShapes in the child component
    const handleResetShapes = () => {
        if (multipleExampleRef.current) {
            multipleExampleRef.current.resetShapes();
        }
    };

    const handleGetShapes = () => {
        if (multipleExampleRef.current) {
            return multipleExampleRef.current.getShapesFromEditors(); // Return the value
        }
        return null; // Return something meaningful if ref is not available
    };

    // const currentToolId = useValue('current tool id', () => editor?.getCurrentToolId(), [editor])

    // async function exportImage() {

    //     if (!editorFront)
    //         return;

    //     const shapeIds = editorFront?.getCurrentPageShapeIds()

    //     if (shapeIds.size === 0) {
    //         return alert('No shapes on the canvas');
    //     }

    //     const box: TlBox = new TlBox(0, 0, 900, 900);

    //     const blob = await exportToBlob({
    //         editorFront,
    //         ids: Array.from(shapeIds),
    //         format: 'png',
    //         opts:
    //         {
    //             background: true,
    //             preserveAspectRatio: 'xMidYMid meet',
    //             bounds: box
    //         },
    //     })

    //     const link = document.createElement('a')
    //     link.href = window.URL.createObjectURL(blob)
    //     link.download = 'every-shape-on-the-canvas.jpg'
    //     link.click()
    // }

    const [shapesFront, setShapesFront] = useState<any>(null)
    const [shapesBack, setShapesBack] = useState<any>(null)

    const { post, put } = useApi();

    const navigate = useNavigate();

    async function exportImageData() {

        window.scrollTo({ top: 0, behavior: "smooth" });

        // Wait for the scroll to finish (adjust time as needed)
        await new Promise(resolve => setTimeout(resolve, 500));

        setCreating(true)
        // get shapes from editor components
        handleResetShapes()

        const shapeObject = handleGetShapes();

        // const frontAssets: Asset[] = shapesFront ? getUniqueAssets(shapesFront) : [];
        // const frontProductAssets: ProductAsset[] = frontAssets ? getProductAssets(shapesFront) : [];

        // const backAssets: Asset[] = shapesBack ? getUniqueAssets(shapesBack) : [];
        // const backProductAssets: ProductAsset[] = backAssets ? getProductAssets(shapesBack) : [];

        if (shapeObject) {
            const frontAssets: Asset[] = getUniqueAssets(shapeObject[0]);
            const frontProductAssets: ProductAsset[] = frontAssets ? getProductAssets(shapeObject[0]) : [];

            const backAssets: Asset[] = getUniqueAssets(shapeObject[1]);
            const backProductAssets: ProductAsset[] = backAssets ? getProductAssets(shapeObject[1]) : [];

            // Sample colours
            const sampleColours: ProductColourDto[] = [
                { id: 1, value: 'Black' },
                { id: 2, value: 'White' }
            ];

            // Sample sizes
            const sampleSizes: ProductSizeDto[] = [
                { id: 1, value: 'XS' },
                { id: 2, value: 'S' },
                { id: 3, value: 'M' },
                { id: 4, value: 'L' },
                { id: 5, value: 'XL' },
                { id: 6, value: '2XL' },
                { id: 7, value: '3XL' }
            ];

            const createProductDto: ProductCreateDto = {
                title: artistInfo.Title, // Replace with actual title
                artistDescription: artistInfo.ArtistDescription, // Replace with actual description
                shopCode: "shopcode_placeholder", // Replace with actual shop code
                price: 0, // Replace with actual price or set it as null
                onSale: false, // Set according to your requirement
                active: true, // Set according to your requirement
                userId: "userid_placeholder", // Replace with actual user ID
                artist: "artist_placeholder", // Replace with actual artist name
                frontAssets: frontAssets.map(asset => ({
                    assetPhrase: asset.assetPhrase,
                    userId: asset.userId,
                    fileName: asset.fileName,
                    mimeType: asset.mimeType,
                    imageData: asset.imageData // Assuming this is already a Uint8Array
                })),
                frontProductAssets: frontProductAssets.map(productAsset => ({
                    x: productAsset.x,
                    y: productAsset.y,
                    width: productAsset.width,
                    height: productAsset.height,
                    rotation: productAsset.rotation,
                    assetPhrase: productAsset.assetPhrase
                })),
                backAssets: backAssets?.map(asset => ({
                    assetPhrase: asset.assetPhrase,
                    userId: asset.userId,
                    fileName: asset.fileName,
                    mimeType: asset.mimeType,
                    imageData: asset.imageData // Assuming this is already a Uint8Array
                })),
                backProductAssets: backProductAssets?.map(productAsset => ({
                    x: productAsset.x,
                    y: productAsset.y,
                    width: productAsset.width,
                    height: productAsset.height,
                    rotation: productAsset.rotation,
                    assetPhrase: productAsset.assetPhrase
                })),
                supplierProduct: {
                    id: selectedProduct?.id ?? 0
                },
                productSizes: sampleSizes.map(size => ({
                    value: size.value
                })),
                productColours: sampleColours.map(colour => ({
                    value: colour.value
                }))
            };
            await createProduct(createProductDto);
            setCreating(false)
        }
    }

    async function createProduct(productCreateDto: ProductCreateDto) {

        const response = await post<ProductCreateDto, any>(`${urlProducts}`, productCreateDto);

        if (response && response.status >= 200 && response.status < 300) {
            // Success: Handle accordingly
            navigate(`/artist/createproduct/success?id=${response.data}`)
        } else {
            // Error: Handle failure case
        }
    }

    function getUniqueAssets(shapes: any[]): Asset[] {
        const assets: Asset[] = shapes
            .filter((s: any) => s.typeName === 'asset') // Filter shapes to only assets
            .map((s: any) => ({
                assetPhrase: s.id,
                imageData: s.props.src,
                fileName: s.props.name,
                mimeType: s.props.mimeType
            }));

        return Array.from(new Set(assets.map(asset => asset.assetPhrase)))
            .map(assetPhrase => assets.find(asset => asset.assetPhrase === assetPhrase) as Asset);
    }

    function getProductAssets(shapes: any[] | null | undefined): ProductAsset[] {
        if (!Array.isArray(shapes)) {
            return [];
        }

        return shapes
            .filter((s: any) => s?.type === 'image' && s?.typeName !== 'asset')
            .map((s: any) => ({
                assetPhrase: s?.props?.assetId || '', // Get assetId from props or default to an empty string
                width: s?.props?.w || 0, // Get width from props or default to 0
                height: s?.props?.h || 0, // Get height from props or default to 0
                rotation: s?.rotation || 0, // Get rotation or default to 0
                x: s?.x || 0, // Get x or default to 0
                y: s?.y || 0, // Get y or default to 0
            }));
    }

    const { showMessage } = useSnackbar(); // Using the snackbar
    const [supplierProductLines, setSupplierProductLines] = useState<SupplierProductLine[]>([]);

    useEffect(() => {
        fetchSupplierProductLines();
    }, []);

    const fetchSupplierProductLines = async () => {
        try {
            const response: AxiosResponse<SupplierProductLine[]> = await axios.get(urlSupplierProductLines);
            setSupplierProductLines(response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
                } else if (error.request) {
                    showMessage('No response from the server. Please try again later.', 'error');
                } else {
                    showMessage(`Error: ${error.message}`, 'error');
                }
            } else {
                showMessage('An unexpected error occurred. Please try again later.', 'error');
            }
        }
    };

    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [filteredSupplierProducts, setFilteredSupplierProducts] = useState<SupplierProduct[]>([]);

    const [selectedProductValue, setSelectedProductValue] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<SupplierProduct | null>(null)

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        const id = newValue ? parseInt(newValue, 10) : null;
        setSelectedValue(id);

        const selectedLine = supplierProductLines.find(option => option.id === id);
        setFilteredSupplierProducts(selectedLine?.supplierProducts || []);
    };

    const handleProductChange = async (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        const id = newValue ? parseInt(newValue, 10) : null;
        setSelectedProductValue(id);

        // Find the selected product by ID
        const selectedProduct = filteredSupplierProducts.find(option => option.id === id);

        // Check if selectedProduct is defined and set selected product
        if (selectedProduct) {
            setSelectedProduct(selectedProduct); // selectedProduct will be of type SupplierProduct
        } else {
            setSelectedProduct(null); // Set to null if not found
        }
    };

    interface ProductInfoProps {
        Title: string;
        ArtistDescription: string;
    }

    const [artistInfo, setArtistInfo] = useState<ProductInfoProps>({
        Title: '',
        ArtistDescription: ''
    });

    // Handle input change for both fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArtistInfo({
            ...artistInfo,
            [name]: value // Update the specific field (Title or ArtistDescription)
        });
    };

    const [frontImage, setFrontImage] = useState<string>('')
    const [backImage, setBackImage] = useState<string>('')

    useEffect(() => {
        setFrontImage(`${selectedProduct?.supplierProductImages?.find(bound => bound.type === 'front'
            && bound.isDefaultImage === true)?.data}`);

        setBackImage(`${selectedProduct?.supplierProductImages?.find(bound => bound.type === 'back'
            && bound.isDefaultImage === true)?.data}`);

    }, [selectedProduct]);

    const [creating, setCreating] = useState<boolean>(false)

    return (
        <>
            {creating ?
                <>
                    <Box
                        sx={{
                            //width: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography level='title-lg'>CREATING PRODUCT...</Typography>
                        <Typography level='body-sm'>Won't be long!</Typography>
                        <Box sx={{ mt: 2 }}>
                            <CircularProgress color="neutral" size="lg" />
                        </Box>
                    </Box>
                </>
                :
                <>
                    <Box sx={{
                        height: 'auto'
                    }}>
                        {/* First Section */}
                        <Box
                            sx={{
                                //width: '100vw',
                                minHeight: '10vh',
                                display: 'flex',            // Use flexbox
                                flexDirection: 'column',    // Stack items vertically
                                //alignItems: 'center',       // Center horizontally
                                //justifyContent: 'left',
                                margin: 2
                            }}
                        >
                            <Box
                                sx={{
                                    //width: '100vw',
                                    display: 'flex',
                                    //justifyContent: 'left',
                                    //alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                {/* <Box>
                            <Typography level='title-lg'>CREATE PRODUCT</Typography>
                        </Box> */}
                                <Box sx={{
                                    //width: '100vw',
                                    display: 'flex',
                                    //justifyContent: 'left',
                                    //alignItems: 'center'
                                }}>
                                    <Box sx={{ p: 1 }}>
                                        <Typography sx={{ p: 1 }}>PRODUCT</Typography>
                                        <Select placeholder='Select a product line...' onChange={handleChange}>
                                            {supplierProductLines.map((s: SupplierProductLine, i: number) => {
                                                return (
                                                    <Option key={s.id} value={s.id}>{s.line}</Option>
                                                )
                                            })}

                                        </Select>
                                    </Box>
                                    <Box sx={{ p: 1 }}>
                                        <Typography sx={{ p: 1 }}>GRAPHIC OPTIONS</Typography>
                                        <Select
                                            sx={{ minWidth: '250px' }}
                                            placeholder="Choose a product..."
                                            disabled={filteredSupplierProducts.length === 0} // Disable if there are no products
                                            onChange={handleProductChange}
                                        >
                                            {filteredSupplierProducts.map((p: SupplierProduct) => (
                                                <Option key={p.id} value={p.id}>
                                                    {p.description}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium and up
                                height: { xs: "auto", md: "auto" }, // Adjust height for mobile
                                width: "90%",
                                margin: "auto", // Center horizontally
                                mt: 2,
                                gap: 2
                            }}
                        >

                            <Box
                                sx={{
                                    flexBasis: "50%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* First Section */}
                                <Box
                                    sx={{
                                        //width: '100vw',
                                        minHeight: '10vh',
                                        display: 'flex',            // Use flexbox
                                        flexDirection: 'column',    // Stack items vertically
                                        alignItems: 'center',       // Center horizontally
                                        justifyContent: 'center',
                                        margin: 2
                                    }}
                                >
                                    <MultipleExample selectedProduct={selectedProduct} frontImage={frontImage} backImage={backImage}
                                        setShapesFront={setShapesFront} setShapesBack={setShapesBack} ref={multipleExampleRef} />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    flexBasis: "50%",
                                    textAlign: 'center',
                                }}
                            >
                                {/* Third Section */}
                                <Box
                                    sx={{
                                        //width: '100vw',
                                        minHeight: '30vh',
                                        display: 'flex',            // Use flexbox
                                        flexDirection: 'column',    // Stack items vertically
                                        alignItems: 'center',       // Center horizontally
                                        justifyContent: 'center',
                                        marginBottom: '2vh'    // Center vertically
                                    }}
                                >
                                    {selectedProduct ?
                                        <>
                                            <Box
                                                sx={{
                                                    //width: '100vw',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography level='title-lg'>PRODUCT DETAILS</Typography>
                                                <Typography level='body-sm'>Customise specific details for your product.</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', p: 1 }}>
                                                    {/* Input field for Title */}
                                                    <Typography>PRODUCT NAME</Typography>
                                                    <Input
                                                        placeholder="Enter your product name"
                                                        name="Title"
                                                        value={artistInfo.Title}
                                                        onChange={handleInputChange}
                                                        sx={{ mb: 2 }}
                                                    />
                                                    {/* Input field for ArtistDescription */}
                                                    <Typography>PRODUCT DESCRIPTION</Typography>
                                                    <Input
                                                        placeholder="Enter your product description"
                                                        name="ArtistDescription"
                                                        value={artistInfo.ArtistDescription}
                                                        onChange={handleInputChange}
                                                    />
                                                    {/* Display the updated Title and Artist Description */}
                                                    <Typography sx={{ mt: 2 }}>
                                                        <b>Shop Product Name Preview: </b><br /> {artistInfo.Title} {selectedProduct?.title}
                                                    </Typography>
                                                    <Typography>
                                                        <b>Shop Product Description Preview: </b><br />{artistInfo.ArtistDescription}
                                                    </Typography>
                                                </Box>
                                                {/* <Box sx={{ marginTop: 2 }}>
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                component="a"
                                                onClick={async () => {
                                                    exportImageData()
                                                }}
                                                size="sm"
                                                sx={{
                                                    alignSelf: 'center',
                                                    margin: 1,
                                                    p: 2,
                                                    bgcolor: '#fcd157',
                                                    color: 'black',
                                                    '&:hover': {
                                                        bgcolor: '#d4a847',
                                                    },
                                                }}
                                            >
                                                CREATE PRODUCT
                                            </Button>
                                        </Box> */}

                                            </Box>
                                        </>
                                        :
                                        <>
                                        </>}
                                </Box>
                            </Box>

                        </Box>
                        {/* Third Section */}
                        <Box
                            sx={{
                                width: '100%',
                                minHeight: '30vh',
                                display: 'flex',            // Use flexbox
                                flexDirection: 'column',    // Stack items vertically
                                alignItems: 'left',       // Center horizontally
                                justifyContent: 'center',
                                marginBottom: '2vh',
                                margin: 'auto'    // Center vertically
                            }}
                        >
                            {selectedProduct ?
                                <>
                                    <Box
                                        sx={{
                                            //width: '100vw',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Typography level='title-lg'>READY TO PUBLISH</Typography>
                                        <Typography level='body-sm'>It'll be available for purchase in 3 minutes!</Typography>
                                        <Box sx={{ marginTop: 2 }}>
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                component="a"
                                                onClick={async () => {
                                                    exportImageData()
                                                }}
                                                size="sm"
                                                sx={{
                                                    alignSelf: 'center',
                                                    margin: 1,
                                                    p: 2,
                                                    bgcolor: '#fcd157',
                                                    color: 'black',
                                                    '&:hover': {
                                                        bgcolor: '#d4a847',
                                                    },
                                                }}
                                            >
                                                CREATE PRODUCT
                                            </Button>
                                        </Box>

                                    </Box>
                                </>
                                :
                                <>
                                </>}
                        </Box>
                    </Box>
                </>}
        </>
    )
}

export default CreateProduct