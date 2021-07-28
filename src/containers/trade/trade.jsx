import { useState } from "react";
import { Container, Grid,/*  Card */ } from "@material-ui/core";
import { CryptoCalculator } from "components/cryptoCalculator/cryptoCalculator";
import ManageBuyOffer from "methodsWallet/manageBuyOffer";
import Orderbook from "methodsWallet/orderbook";
import TradingView from "components/tradingView/tradingView";
import OffersByAccount from "methodsWallet/offersByAccount";
import { supabase } from "../../supabase/supabase";



function Trade() {
  const [assets, setAssets] = useState();
  const [user, setUser] = useState();
  const session = supabase.auth.session();

  async function getAssets() {
    const { data: assets } = await supabase.from("assets").select("*");
    return setAssets(assets)
  }
  if (!assets) getAssets()



  const keys = async () => {
    const { data: public_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    if (public_key[0])
      return setUser({ ...user, publicKey: public_key[0].public_key });

    const { data: secret_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    if (secret_key[0])
      return setUser({ ...user, secretKey: secret_key[0].secret_key });
  }
  keys()
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid container item display="column" justifyContent={true}>
          <Grid item xs={12} sm={3} style={{ height: "700px" }}>
            <Orderbook assets={assets} />
          </Grid>
          <Grid container item xs={12} sm={6}>
            <Grid
              item
              xs={12}
              style={{
                height: "400px",
                paddingRight: "25px",
                paddingTop: "40px",
              }}
            >
              <TradingView />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ManageBuyOffer
                publicKey={user?.publicKey}
                secretKey={user?.secretKey}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ManageBuyOffer />
            </Grid>
          </Grid>
          <Grid container item sm={3}>
            <Grid item xs={12} style={{ height: "300px", paddingTop: "40px" }}>
              {/* <Card style={{height:'300px'}}>Listado de ventas activas</Card> */}
              <OffersByAccount publicKey={user?.publicKey} />
            </Grid>
            <Grid item xs={12}>
              <CryptoCalculator />
            </Grid>
            </Grid>
            </Grid>

          </Grid> 
      
    </Container>
  );
}
export default Trade;
