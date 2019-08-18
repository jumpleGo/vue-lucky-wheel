<template>
<div class="hello">
    <header class="header">
        <div class="container" style="display: flex;
    flex-direction:row; color:white;align-items: center;justify-content: space-around;">
            <div class="header-container">
                <div class="header-left">

                    <span ref="mail_head" class="mail_head" style="color: white">

                    </span>
                    <span style="color: white;" class="exit" @click="exit">(Выход)</span>

                </div>
            </div>

            <div ref="balance" class="header-right" style="background: rgba(15, 15, 15, 0.897);padding:7px 5px;border-radius:50px;display: flex;align-items: center;justify-content: center;">
                <span>10</span>₽

            </div>
        </div>

    </header>
    <div id="app">

        <div class="wheel__wrapper">

            <div class="opred">

            </div>

            <div class="content__wrapper" ref="roulette" @transitionend="turningEnd">
                <img ref="image_center" :src=getImgUrl(src2) style="z-index:999;top: 40%;left:  40%;width: 20%;
        border-radius: 50%;
        position: absolute;
        overflow: hidden;" alt="">
                <img ref="image_round" style="z-index:999;top: 0%;left:  0%;width: 100%;
        max-width: 540px;
        border-radius: 50%;
        position: absolute;
        overflow: hidden;" :src=getImgUrl(src) alt="">
                <div class="sector__wrapper">
                    <div class="sector" :class="awardIdx === i && isShowResult? 'is-highlight' : ''" v-for="(p, i) in prizes" :key="i" :style="`transform: rotate(${0.25 - (1/length)/2 - i*(1/length)}turn) skew(${90 - 360/length}deg)`"></div>
                </div>

                <div class="label__wrapper">
                    <div class="label" v-for="(p, i) in prizes" :key="i" :style="`transform: translateX(-50%) rotate(${-i*(1/length)}turn)`" :class="awardIdx === i && isShowResult ? 'is-highlight' : ''">

                        <h2 class="text">{{ p.text_in }}</h2>
                    </div>
                </div>

            </div>

            <div class="result__wrapper" :class="isShowResult ? 'is-show': ''">

                <h1 class="award">Вы выиграли {{ result }} </h1>

            </div>
            <button ref="button" class="wheel__controller" @click="turning">
                <h6 class="controller__label">ВРАЩАТЬ ({{ chance }})</h6>
            </button>
        </div>
    </div>

    <section ref="modal" class="modal">
        <div class="center" style=" padding: 20px;  display: flex;flex-direction: column;align-items: center; ">
            <h2>Войдите в аккаунт чтобы выиграть приз.</h2>
            <div class="form">
                <div class="input">
                    <label for="email" class="log_label">Ваша почта</label> <input type="text" v-model="email_in" class="input__once email" name="email">
                </div>
                <div class="input">
                    <label for="pass" class="log_label">Пароль</label><input type="password" v-model="password_in" class="input__once pass" name="pass">
                </div>
                <span class="log_button" @click="onSignUp">Войти</span>

            </div>
            <span class="err" style="
            width:80%;
            "></span>
            <div class="mini_footer">
                <p>Нет аккаунта? </p><a class="registr" @click="change"> Зарегистрируйтесь!</a>
            </div>
        </div>
    </section>

    <section ref="registration" class="registration">
        <div class="center" style=" padding: 20px;;   display: flex;flex-direction: column;align-items: center; ">
            <h2>Регистрация в True_betters.game</h2>
            <div class="form">
                <div class="input">
                    <label for="email" class="log_label">Ваша почта</label> <input type="text" v-model="email_reg" class="input__once email_reg" name="email">
                </div>
                <div class="input">
                    <label for="pass" class="log_label">Пароль</label><input type="password" v-model="password_reg" class="input__once pass_reg" name="pass">
                </div>
                <span class="reg_button" @click="onReg">СОХРАНИТЬ</span>

            </div>
            <span class="err2" style="
          width:80%;
          "></span>
            <div class="mini_footer">
                <p>Есть аккаунт? </p><a class="registr" @click="dbchange"> Вход!</a>
            </div>

        </div>
    </section>
</div>
</template>

<script>
import {
    db
} from '../main'
import {
    auth
} from '../main'

export default {
    name: 'HelloWorld',
    computed: {

        length() {
            return this.prizes.length;
        },
        result() {

            if (this.awardIdx === -1) {
                return null;
            } else {
                return this.prizes[this.awardIdx].text;

            }
        },
        turn2() {
            return (this.r * 50 + 1) * (-1);
        },
        turn() {
            return this.r * 50 + 1;
        },
        awardIdx() {

            return (
                Math.round((this.turn - Math.floor(this.turn)) * this.length) %
                this.length
            );
        },

    },

    data() {
        return {
            src: 'round.png',
            src2: 'center.png',
            prizes: [{
                    text_in: "40",
                    text: "Скидка 40 руб на экспресс"

                },
                {

                    text_in: "💣",
                    text: "Ничего"
                },
                {
                    text_in: "80",
                    text: "Скидка 80 руб на экспресс"

                },
                {

                    text_in: "💣",
                    text: "Ничего"
                },
                {

                    text_in: "free",
                    text: "Бесплатный экспресс"
                },
                {

                    text_in: "💣",
                    text: "Ничего"
                },
                {

                    text_in: "200",
                    text: "Скидка 200Р на чат с FIFA18"
                },
                {

                    text_in: "💣",
                    text: "Ничего"
                },
                {

                    text_in: "⟳",
                    text: "Бесплтаный спин"
                },
                {

                    text_in: "💣",
                    text: "Ничего"
                },
                {

                    text_in: "50%",
                    text: "Скидка 50% на все"
                },
                {

                    text_in: "💣",
                    text: "Ничего"
                },
            ],
            r: 1,
            isShowResult: false,
            chance: Number,
            disabled: 'disabled',
            email_in: '',
            password_in: '',
            user: auth.currentUser,
            email_reg: '',
            password_reg: '',
            data : {}

        };
    },
    mounted() {
        auth.onAuthStateChanged((user) => {

            const setupUI = (user) => {
                if(!user) {
                    this.$refs.modal.style.visibility = "visible";
                    this.$refs.button.style.visibility = "hidden"
                } else {
                
db.collection('users').doc(user.uid).get().then(doc => {
                 let myData = doc.data()
                  this.chance = myData.spin
                   
                })              
                    this.$refs.mail_head.textContent = user.email;
                    this.$refs.button.style.visibility = "visible";

                }}
            

            if (user) {
                setupUI(user);
            } else {
                setupUI();

            }

        }, )

    },

    //       firestore(){
    //         return{
    //      chance: db.collection('users').doc().get().then(data=>{
    //  data.spin
    //      })

    //      }

    //      },

    methods: {

        getImgUrl(pic) {
            return require('./../assets/' + pic);
        },
        change() {
            this.$refs.modal.style.visibility = "hidden";
            this.$refs.registration.style.visibility = "visible";
        },

        dbchange() {
            this.$refs.registration.style.visibility = "hidden";
            this.$refs.modal.style.visibility = "visible";

        },
        turning(user) {
            if (this.chance <= 0) {
                this.$refs.button.setAttribute("disabled", this.disabled);
            } else {
                db.collection('users').doc(user.uid).set({
                 spin : 0
                   
                })
                this.isShowResult = false;
                this.r = Math.random();
                this.$refs.roulette.style.transform = `rotate(${this.turn}turn)`;
                this.$refs.image_round.style.transform = `rotate(${this.turn2}turn)`;
                this.$refs.image_center.style.transform = `rotate(${this.turn2}turn)`;
                this.$refs.roulette.classList.add("turning");
                this.$refs.image_round.classList.add("turning");
                this.$refs.image_center.classList.add("turning")

            }

        },
        turningEnd(user) {
            this.$refs.roulette.classList.remove("turning");
            this.$refs.image_round.classList.remove("turning")
            this.isShowResult = true;
            if (this.prizes[this.awardIdx].text == "Бесплатный спин") {
                this.chance += 1;
            }
             db.collection('users').doc(user.uid).add().then(doc => {
                 let myData = doc.data()
                  myData.award = this.prizes[this.awardIdx].text 
                   
                })

        },
        onSignUp() {
            let email = this.email_in;
            let password = this.password_in;
            auth.signInWithEmailAndPassword(email, password).then((user) => {
                this.$refs.modal.style.visibility = "hidden",
                    this.$refs.registration.style.visibility = "hidden"
                db.collection('users').doc(user.uid).get().then(data => {
                    this.chance = data.spin
                })

            }).catch(error => {
                document.querySelector(".err").innerHTML = error
            });
        },
        exit() {
            auth.signOut().then(() => {});
            location.reload();

        },
        onReg(user) {
            let email = this.email_reg;
            let password = this.password_reg;
            auth.createUserWithEmailAndPassword(email, password).then(() => {
                db.collection('users').doc(user.uid).set({
                    spins: 1,
                });

                this.$refs.registration.style.visibility = "hidden";
                this.$refs.button.style.visibility = "visible";
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    document.querySelector('.err2').innerHTML = 'Пароль неверный.';
                } else {
                    document.querySelector('.err2').innerHTML = errorMessage;

                }

            });

        },

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.center {
    background-image: url('./../assets/bg.png');
}

body {
    overflow: hidden;
}

.opred {
    position: absolute;
    display: flex;
    justify-content: row;
    top: 10%;

}

.opred img {
    width: 40px;
    height: 40px;
}

@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:700i");

#app {
    overflow: hidden;
    font-family: "Segoe UI", "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('./../assets/casino-background-280x177.jpg');
    background-position: center;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.wheel__wrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: 900px;
}

.wheel__wrapper .wheel__controller {

    width: 100%;
    z-index: 3;
    position: absolute;
    top: 87%;
    visibility: hidden;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
    overflow: visible;
    display: flex;
    justify-content: center;
    padding: 0px 0px;
    background: transparent;
    border: none;
    outline: none;
}

.wheel__wrapper .wheel__controller .controller__label {
    background-color: #a01a15;

    padding: 10px 60px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    box-shadow: 0px 0px 20px -5px black;

}

.wheel__wrapper .result__wrapper {
    position: absolute;
    width: 90%;
    top: 70%;
    color: white;
    font-size: 10px;
    height: 150px;
    font-weight: bold;
    background-color: transparent;
    letter-spacing: -1px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    transition: none;
    opacity: 0;
    overflow: hidden;
}

.wheel__wrapper .result__wrapper.is-show {
    opacity: 1;
    transition: opacity 0.3s;
}

.wheel__wrapper .result__wrapper .result__inner {
    width: 100%;
    max-width: 1100px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wheel__wrapper .result__wrapper .result__inner .congratute {
    flex: 0 0 182px;
    font-size: 30px;
    color: white;
    text-align: left;
    letter-spacing: -2px;
    line-height: 0.9;
}

.wheel__wrapper .result__wrapper .result__inner .result__text {
    flex: 0 0 182px;
}

.wheel__wrapper .result__wrapper .result__inner .result__text .prefix-award {
    font-size: 30px;
    color: white;
    text-align: left;
    letter-spacing: -2px;
    line-height: 0.9;
}

.wheel__wrapper .result__wrapper .result__inner .result__text .award {
    width: fit-content;
    font-size: 30px;
    line-height: 30px;
    color: #a01a15;
    position: relative;
    letter-spacing: -3px;
}

.wheel__wrapper .result__wrapper .result__inner .result__text .award::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #a01a15;
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec {
    font-size: 42px;
    opacity: 0.7;
    color: #a01a15;
    position: absolute;
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(1) {
    left: -20px;
    top: 60%;
    transform: rotate(30deg);
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(2) {
    top: 3px;
    left: 22%;
    transform: rotate(-30deg);
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(3) {
    bottom: -16px;
    left: 240px;
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(4) {
    top: -12px;
    left: 6%;
    transform: rotate(30deg);
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(5) {
    top: -5px;
    right: 20%;
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(6) {
    bottom: -10px;
    right: 16%;
    transform: rotate(-30deg);
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(7) {
    right: -3px;
    top: 20px;
    transform: rotate(30deg);
}

.wheel__wrapper .result__wrapper .result-bg-dec__wrapper .result-bg-dec:nth-child(8) {
    right: 5%;
    top: 50%;
}

.wheel__wrapper .content__wrapper {
    overflow: hidden;
    width: calc(100% - 100px);
    max-width: 540px;
    border-radius: 50%;
    position: absolute;
    overflow: hidden;
    z-index: 2;
    transition: all 0;
}

.turning {
    transition: all 1s cubic-bezier(0.44, 0.02, 0.09, 1);
}

.wheel__wrapper .content__wrapper .sector__wrapper {
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    width: 95%;
    height: 95%;
    border-radius: 50%;
    overflow: hidden;
}

.wheel__wrapper .content__wrapper .sector__wrapper .sector {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    margin-top: -50%;
    margin-left: -50%;
    transform-origin: 100% 100%;
    font-size: 24px;
    display: flex;
    border: 1px solid black;
}

.wheel__wrapper .content__wrapper .sector__wrapper .sector:nth-child(odd) {
    background-color: #ffffff;
}

.wheel__wrapper .content__wrapper .sector__wrapper .sector:nth-child(even) {
    background-color: #000000;
}

.wheel__wrapper .content__wrapper .sector__wrapper .sector.is-highlight {
    background-color: #c02c27;
}

.wheel__wrapper .content__wrapper .label__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.wheel__wrapper .content__wrapper .label__wrapper .label {
    position: absolute;
    top: 0;
    left: 50%;
    height: 50%;
    padding: 30px;
    transform-origin: 50% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wheel__wrapper .content__wrapper .label__wrapper .label:nth-child(odd) {
    color: #000000;
}

.wheel__wrapper .content__wrapper .label__wrapper .label:nth-child(even) {
    color: #ffffff;
}

.wheel__wrapper .content__wrapper .label__wrapper .label.is-highlight {
    color: white;
}

.wheel__wrapper .content__wrapper .label__wrapper .label .text,
.wheel__wrapper .content__wrapper .label__wrapper .label .icon {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -1.9px;
}

.wheel__wrapper .content__wrapper .label__wrapper .label .icon {
    font-size: 35px;
}

.wheel__wrapper .content__wrapper::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-position: center center;
    background-size: contain;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.wheel__wrapper .content__wrapper::before {
    content: "";
    display: block;
    padding-top: 100%;
    border-radius: 50%;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .wheel__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100vw;
        height: 100vh;
        min-width: auto;
    }

    .wheel__wrapper .content__wrapper {
        position: relative;
        margin-bottom: 20%;
    }

    .opred {
        position: relative;
        margin-top: 10%;

    }

    .wheel__wrapper .wheel__controller {
        top: auto;
        position: relative;
        margin-bottom: 20%;

    }
}

@media only screen and (min-device-width : 412px) and (max-device-width : 732px) {
    .opred {
        position: relative;
        margin-top: 15%;

    }
}

.registration {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    visibility: hidden;
    z-index: 9999;
    left: 5%;
    top: 10%;
    background: rgb(66, 1, 1);
    width: 90%;
    box-shadow: 0px 0px 10px 0px black;
}

.modal {
    visibility: hidden;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 9999;
    left: 5%;
    top: 10%;
    background: rgb(66, 1, 1);
    width: 90%;
    box-shadow: 0px 0px 10px 0px black;

}

.form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center
}

.input {
    display: flex;
    flex-direction: column;
}

.input__once {
    font-size: 17px;
    padding: 10px;
    box-shadow: 0px 0px 10px 0px black;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.445);
    color: white;
}

.mini_footer {
    display: flex;
    flex-direction: row;
}

.log_label {
    font-size: 18px;
    padding: 8px 0px;
}

.log_button:active,
.reg_button:active {
    transform: translateY(2px);
    transition: 0.1s;
}

.log_button {
    background-image: url('./../assets/button.png');
    background-size: cover;
    width: 60%;
    padding: 14px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 10px;
    color: #3d0b0b;
    font-size: 20px;
    text-transform: uppercase;
    margin-top: 20px;
    margin-bottom: 40px;
    box-shadow: 0px 0px 10px 0px rgb(153, 126, 4);

}

.reg_button {
    background-image: url('../assets/button.png');
    background-size: cover;
    width: 60%;
    padding: 15px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 10px;
    color: #1b1b1b;
    font-size: 18px;
    text-transform: uppercase;
    margin-top: 20px;
    margin-bottom: 40px;

}

.registr {
    color: rgb(233, 174, 13);
    border-bottom: 1px solid rgb(255, 174, 0);
}
</style>
