import { Grid } from "@mui/material";

interface MainProps {
  children: React.ReactNode
}

const Main = ({children}: MainProps) => <>
  <Grid container spacing={1}>
    <Grid item xs md/>
    <Grid item xs={8} md={8} sx={{ p: '8px !important' }}>
      {children}
    </Grid>
    <Grid item xs md/>
  </Grid>
</>

export default Main;