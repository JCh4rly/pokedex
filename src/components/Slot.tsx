import { Grid } from "@mui/material";

interface SlotProps {
  children: React.ReactNode | React.ReactNode[]
}

const Slot = ({ children }: SlotProps) => <>
  <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
    {children}
  </Grid>
</>

export default Slot;
