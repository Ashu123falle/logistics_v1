import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const initialDocuments = [
  { name: "Driver License", uploaded: true, file: null },
  { name: "Truck Insurance", uploaded: false, file: null },
  { name: "Proof of Delivery", uploaded: true, file: null },
];

export default function Documents() {
  const [docs, setDocs] = useState(initialDocuments);
  const fileInputRef = useRef(null);
  const currentDocIndex = useRef(null);

  const handleUploadClick = (index) => {
    currentDocIndex.current = index;
    fileInputRef.current.click(); // Trigger file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const updatedDocs = [...docs];
    updatedDocs[currentDocIndex.current].uploaded = true;
    updatedDocs[currentDocIndex.current].file = file;
    setDocs(updatedDocs);

    alert(`${file.name} uploaded for ${updatedDocs[currentDocIndex.current].name}`);
    event.target.value = ""; // Reset file input
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Driver Documents
      </Typography>

      <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
        <List>
          {docs.map((doc, index) => (
            <React.Fragment key={doc.name}>
              <ListItem
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#f9fafb" },
                }}
                secondaryAction={
                  <Button
                    variant={doc.uploaded ? "outlined" : "contained"}
                    color={doc.uploaded ? "primary" : "success"}
                    startIcon={<CloudUploadIcon />}
                    onClick={() => handleUploadClick(index)}
                    size="small"
                  >
                    {doc.uploaded ? "Re-upload" : "Upload"}
                  </Button>
                }
              >
                <ListItemText
                  primary={
                    <Typography fontWeight="medium">{doc.name}</Typography>
                  }
                  secondary={
                    <Chip
                      label={doc.uploaded ? "Uploaded" : "Not Uploaded"}
                      size="small"
                      color={doc.uploaded ? "success" : "warning"}
                      icon={
                        doc.uploaded ? (
                          <CheckCircleIcon fontSize="small" />
                        ) : (
                          <ErrorIcon fontSize="small" />
                        )
                      }
                      sx={{ mt: 0.5 }}
                    />
                  }
                />
              </ListItem>
              {index < docs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Hidden file input */}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Box>
  );
}
