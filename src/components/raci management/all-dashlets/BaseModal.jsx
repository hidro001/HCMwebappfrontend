// components/DetailModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, useMediaQuery } from "@mui/material";

export default function DetailModal({
  open,
  onClose,
  loading = false,
  rows = [],
  title = "Details",
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function useDisplayRows(rows) {
    return rows.map((raw) => {
      const cleaned = {};
      Object.entries(raw).forEach(([k, v]) => {
        if (k === "_id" || k === "__v") return; // hide internal

        // 1) ISO date → readable
        if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
          cleaned[k] = new Date(v).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return;
        }

        // 2) plain object → JSON string (short)
        if (v && typeof v === "object" && !Array.isArray(v)) {
          cleaned[k] = JSON.stringify(v);
          return;
        }

        cleaned[k] = v;
      });
      return cleaned;
    });
  }

  const displayRows = useDisplayRows(rows);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", m: 4 }} />
        ) : (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {/* show pretty headers except internal fields */}
                {displayRows.length > 0 &&
                  Object.keys(displayRows[0]).map((k) => (
                    <TableCell key={k} sx={{ fontWeight: 600 }}>
                      {k
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayRows.map((r, i) => (
                <TableRow key={i}>
                  {Object.values(r).map((v, j) => (
                    <TableCell key={j}>
                      {Array.isArray(v) ? `${v.length} items` : String(v)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
