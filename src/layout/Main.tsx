import { Grid } from "@mui/material";

interface MainProps {
  children: React.ReactNode
}

const Main = ({children}: MainProps) => <>
  <Grid container spacing={2}>
    <Grid item xs md/>
    <Grid item xs={8} sx={{ background: 'gray' }}>
      {children}
    </Grid>
    <Grid item xs md/>
  </Grid>
</>

export default Main;