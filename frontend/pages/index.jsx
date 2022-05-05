import { userService } from 'services';
import { useState, useEffect } from 'react';

export default Home;

function Home() {
    const [ balance, setBalance] = useState(0);
    useEffect(() => {
        const getBalance = () => {
            if(userService.userValue) {
                userService.getBalance(userService.userValue).then((value) => {
                    setBalance(value);
                })
            }
        }
        getBalance();
        setInterval(() => {
            getBalance();
        }, 5000);
    })

    return (
        <div className="p-5">
            <div className="container">
                <span className="px-40 font-sans text-2xl text-slingnavyblue font-bold">Hi {userService.userValue?.firstName}!</span>
                <div className="px-40 pt-20">
                    <span className="pl-60 font-sans text-2xl text-slingnavyblue font-bold">Your current balance is  </span>
                    <span className="font-sans text-6xl text-slingblue font-bold">{balance}</span>
                    <span className="font-sans text-2xl text-slingnavyblue font-bold">  sling coins!</span>
                </div>
            </div>
        </div>
    );
}
