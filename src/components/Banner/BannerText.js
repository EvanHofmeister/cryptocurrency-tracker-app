import { Container, makeStyles, Typography } from "@material-ui/core";
import BannerCarousel from "./BannerCarousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./Poly_crop.png)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function BannerText() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Inter",
              color: "#f6ae2d"
            }}
          >
            Cryptocurrency Dashboard
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#f6ae2d",
              textTransform: "capitalize",
              fontFamily: "Inter",
            }}
          >
            Find information on your favorite Cryptocurrency
          </Typography>
        </div>
        <BannerCarousel />
      </Container>
    </div>
  );
}

export default BannerText;
