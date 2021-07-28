import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";
import { takeSecretKey, takePublicKey, validate } from "./transactioTools";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  ButtonGroup,
  Divider,
} from "@material-ui/core";
import useStyles from 'styles';
import Swal from 'sweetalert2';

export default function Transaction() {
  const [error, setError] = useState({
    isError: true,
    email: "",
    amount: "",
  });
  const [transaction, setTransaction] = useState("");
  const [succesTransaction, setSuccesTransaction] = useState(false);
  const [input, setInput] = useState({
    email: "",
    amount: "",
  });
  const session = supabase.auth.session();
  const history = useHistory();
  const submit = false;
  const [transfer, setTransfer] = useState(false);

  const classes = useStyles();

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleMail = async () => {
    let PublicKey = await takePublicKey(input.email);
    if (PublicKey) return PublicKey;
    return undefined;
  };

  const handleTransaction = async (event) => {
    event.preventDefault();
    let receiverPublicKey = await handleMail();

    if (receiverPublicKey) {
      let info = await supabase
        .from("RegisteredUsers")
        .select("bannedUser")
        .eq("email", input.email);

      if (info.data[0].bannedUser) {
        Swal.fire({
          title: 'Hold it!',
          text: "User is banned",
          icon: 'warning',
          confirmButtonText: 'Cool',
          background: '#1f1f1f',
          confirmButtonColor:'rgb(158, 158, 158)',
        });
      } else {
        let sourceSecretKey = await takeSecretKey();
        let succes = await axios.post("http://localhost:3001/payment", {
          sourceSecretKey: sourceSecretKey,
          receiverPublicKey: receiverPublicKey,
          amount: input.amount,
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          confirmButtonText: 'Cool',
          background: '#1f1f1f',
          confirmButtonColor:'rgb(158, 158, 158)',
        });
        setSuccesTransaction(true);
        setTransaction(succes.data);
        setInput({
          email: "",
          amount: "",
        });
        setTransfer(true);
      }
    } else {
      Swal.fire({
        title: 'Uops!',
        text: "Mail is not registered",
        icon: 'error',
        confirmButtonText: 'Ok',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      });
    }
  };

  const handleNewTransaction = () => window.location.reload();

  return (
    <Container className={classes.cardCheck}>
      {session ? (
        <div>
          <Typography variant="h4">Transaction</Typography>
          <Typography variant="h5">
            Search by email the person you want to transfer
          </Typography>
          <br />
          <Divider className={classes.divider}/>
          <form onSubmit={handleTransaction}>
            <FormControl className={classes.formCheck}>
              <TextField
                label={error.email === "" ? "Email" : error.email}
                name="email"
                type="text"
                value={input.email}
                onChange={handleChange}
                color={error.email === "" ? "primary" : "secondary"}
                fullWidth={true}
              />
              <TextField
                label={error.amount === "" ? "Amount" : error.amount}
                name="amount"
                type="text"
                value={input.amount}
                onChange={handleChange}
                disabled={error.email === "" ? submit : !submit}
                color={error.email === "" ? "primary" : "secondary"}
                fullWidth={true}
              />
            </FormControl>{" "}
            <br /> <br />
            <ButtonGroup className={classes.formCheck}>
              <Button
                type="submit"
                variant="outlined"
                className={classes.yellowButton}
                style={{width: '60%', color: '#ffd523'}}
                disabled={error.isError || transfer ? !submit : submit}
                >
                Transfer
              </Button>{" "}
              <br />
              <Button
                onClick={handleNewTransaction}
                variant="contained"
                color="primary"
                disabled={succesTransaction ? submit : !submit}
                >
                New Transaction
              </Button>
            </ButtonGroup>
          </form>
        </div>
      ) : (
        history.push("/")
      )}
      {succesTransaction ? (
        <div>
          <Typography variant="h6">
            To see the detail of your transaction go to the follow link:
          </Typography>
          <a href={transaction} rel="noreferrer" target="_blank">
            Transaction Info
          </a>
          <br />
        </div>
      ) : null}
    </Container>
  );
}
