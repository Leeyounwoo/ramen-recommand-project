/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";

export default function BackArrow({ pathname, userInfo }) {
  return (
    <>
      <Link
        href={{
          pathname: pathname,
          query: { userInfo: JSON.stringify(userInfo) },
        }}
      >
        <Button
          sx={{ mx: 25 }}
          style={{ color: "orange", border: "1px solid orange" }}
          variant="outlined"
          fontSize="large"
          startIcon={<ArrowBackIosIcon />}
        >
          PREV
        </Button>
      </Link>
    </>
  );
}
