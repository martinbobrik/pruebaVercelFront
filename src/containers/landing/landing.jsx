import { Container, Grid, Typography, Button, Divider, Box, Card } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SecurityIcon from '@material-ui/icons/Security';
import stellarIcon from './stellar.svg';
import balance from './balance.svg';
import Faq from 'components/faq/faq';
import useStyles from 'styles';
import './landing.css';
import { Link } from 'react-scroll';
import { supabase } from "supabase/supabase";
import { useHistory } from "react-router";

const Landing = () => {
    const classes = useStyles();
    const history = useHistory();

    let session = supabase.auth.session();


    return (
        <Container  className='landing'>
        {session ? history.push("/home") : null}

            <Grid container xs={12} className={classes.landingContainers} spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="h4"> 
                        <Link activeClass="active"
                        to="presentation"
                        spy={true}
                        smooth={true}
                        hashSpy={true}
                        offset={50}
                        duration={500}
                        className='navItems'>
                            RocketXChange
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4">
                        <Link activeClass="active"
                            to="cryptos"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={50}
                            duration={500}
                            className='navItems'>
                                Cryptos 
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4"> 
                        <Link activeClass="active"
                            to="rocketFeatures"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={50}
                            duration={500}
                            className='navItems'>
                                About us 
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4">
                        <Link activeClass="active"
                                to="frequencyQuestion"
                                spy={true}
                                smooth={true}
                                hashSpy={true}
                                offset={50}
                                duration={500}
                                className='navItems'>
                                    FAQ  
                        </Link> 
                    </Typography>
                </Grid>
                <Grid container xs={3} justifyContent="space-around">
                    <Button color="secundary" variant="contained" justifyContent="left" href='/register'>
                        REGISTER
                    </Button> 
                    <Button color="primary" variant="contained" justifyContent="left" href='/login' style={{color:'#000', backgroundColor: '#ffd523'}}>
                        LOGIN
                    </Button>
                </Grid>
            </Grid>

            <Divider variant="middle" style={{margin: '1%', backgroundColor:'#fdfbfb'}}/>

            <div className="presentation">
                <Grid container xs={12} className="titleContainer">
                    <Typography item xs={8} variant="h2" align="left" > Make your money work with cryptocurrencies</Typography>
                    <Box item xs={4} fontSize={22} fontStyle="oblique"> 
                        Bet on the future of finance and save without restrictions
                    </Box >
                </Grid>
                <Grid container xs={12} spacing={6} justifyContent="flex-end">
                    <Box className={classes.presentationBox}  letterSpacing={4} spacing={6} alignItems="center"> 
                    <Typography item xs={4} variant="h5">
                        Trades here are peer-to-peer!
                        On StellarX you trade directly with other traders. There’s no one in the middle. You always have sole control of your assets.
                    </Typography>
                    </Box>
                </Grid>
            </div>


            <div className="register">
                <Grid container={true} xs={12} className={classes.landingRegister} spacing={6} style={{padding:'8%'}}>
                    <Typography item xs={8} variant="h4">
                        Don't let time go by, start trading now!
                    </Typography>
                    <Box item xs={4}>
                        Logo RocketXchange
                    </Box>
                    <Grid item xs={4} alignItems='center'>
                        <Button className='registerButton'  href='/register' style={{ padding:'10px', width:'60%', backgroundColor: '#ffd523', color: '#272727b3', letterSpacing:'3px'}} variant="contained">REGISTER!</Button> 
                    </Grid>
                </Grid>
            </div>



            <div className="cryptos">
                <Grid container xs={12} className={classes.landingContainers} spacing={6} style={{padding:'8%'}}>
                    <Typography item xs={3} variant="h4" className={classes.landingCard}>
                        Get in real time the waves of the cryptos with the highest volume to make better investments!
                    </Typography>
                    <Grid item xs={9} className="crypto-graphics">
                        {/* <CryptoGraphics /> */}
                    </Grid>
                </Grid>
            </div>

            <div className="rocketFeatures">
                <Grid>
                    <Typography variant="h4" className='rocketFeaturesTypography'> What can you do with RocketExChange? </Typography>
                </Grid>
                <Grid container xs={12} justifyContent="space-evenly" className='aboutGrid'>
                        <Card item xs={3} className={classes.landingCards}>
                            <MonetizationOnIcon fontSize="large"/>
                            <Typography>The better way to trade directly with other traders. There’s no one in the middle!</Typography>
                        </Card>
                        <Card item xs={3} className={classes.landingCards}>
                            <SecurityIcon fontSize="large"/>
                            <Typography> Acquire your cryptocurrencies safely</Typography>
                        </Card>
                        <Card item xs={3} className={classes.landingCards}>
                            <img className="cryptoIcons" src={stellarIcon} alt="no img"/>
                            <Typography>Deposit and withdraw, fiat and crypto</Typography>
                        </Card>
                        <Card item xs={3} className={classes.landingCards}>
                            <img className="cryptoIcons" src={balance} alt="no img"/>
                            <Typography >Use our platform to see your balances</Typography>
                        </Card>
                </Grid>
            </div>

            <div className="frequencyQuestion">
                <Grid container xs={12} className={classes.landingContainers} >
                    <Grid item xs={12} >
                        <Faq />
                    </Grid>
                </Grid>
            </div>

            <Link 
                activeClass="active"
                to="landing"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={500}
                className="toTopButton">
                    <Button>
                        up!
                    </Button>
            </Link>
        </Container>
    )
};
export default Landing;
