import { useState, useEffect } from 'react';
import { Follower, Sub, Bit } from './Credits.types'
import './Credits.scss';
import apiConnector from '../../utils/apiConnector';


const Credits = () => {

  const [follows, setFollows] = useState<Follower[] | []>([]);
  const [gotFollows, setGotFollows] = useState<boolean>(false);
  const [subs, setSubs] = useState<Sub[] | []>([]);
  const [gotSubs, setGotSubs] = useState<boolean>(false);
  const [bits, setBits] = useState<Bit[] | []>([]);
  const [gotBits, setGotBits] = useState<boolean>(false);
  const [creditsCount, setCreditsCount] = useState<number>(0);
  const [gotCreditsCount, setGotCreditsCount] = useState<boolean>(false);

  const url = 'http://127.0.0.1:3321';

  // Poll database for new follows
  const getFollows = async () => {
    try {
      const response = await apiConnector.get(`/api/follows`);
      setGotFollows(true);
      setFollows(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getSubs = async () => {
    try {
      const response = await apiConnector.get(`/api/subs`);
      setSubs(response.data)
      setGotSubs(true);
    } catch (error) {
      console.error(error);
    }
  }

  const getBits = async () => {
    try {
      const response = await apiConnector.get(`/api/bits`);
      setBits(response.data);
      setGotBits(true);
    } catch (error) {
      console.error(error);
    }
  }

  const getCreditsCount = () => {
    if (gotBits && gotFollows && gotSubs) {
      setCreditsCount(follows.length + subs.length + bits.length);
      setGotCreditsCount(true);
    }
  }

  useEffect(() => {
    if (!gotFollows) {
      getFollows();
    }
    // console.log(follows);
  },[follows, gotFollows])

  // Poll database for new subs
  useEffect(() => {
    if (!gotSubs) {
      getSubs();
    }
    // console.log(subs);
  },[subs, gotSubs])

  // Poll database for new bits
  useEffect(() => {
    if (!gotBits) {
      getBits();
    }
    // console.log(bits);
  },[bits, gotBits])

  useEffect(() => {
    if (!gotCreditsCount) {
      getCreditsCount();
    }
    // console.log(creditsCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gotCreditsCount]) // Future me, I know this throws a warning, but present me doesn't care.

  const setCreditsAnimationLength = () => {
    let animationTime = 20;
    if (creditsCount > 0) {
      const creditsTime = creditsCount * 2;
      animationTime = animationTime + creditsTime;
    }
    console.log(animationTime);
    return animationTime;
  }

  const animationStyle = {
    animation: `credits ${setCreditsAnimationLength()}s linear`,
    animationFillMode: `forwards`,
  }

  return (
    <div className='credits credits_wrapper' style={animationStyle}>
      <h1 className='credits credits_h1'>ROLL THEM CREDITS!</h1>
      <div className='credits credits_section'>
        <h2 className='credits credits_h2'>New Subs!</h2>
        <ul className='credits credits_list'>
          {subs.map((sub: Sub) => {
            return <li className='credits credits_item' key={sub.id}>{sub.sub}</li>
          })}
        </ul>
      </div>
      <div className='credits credits_section'>
        <h2 className='credits credits_h2'>New Follows!</h2>
        <ul className='credits credits_list'>
          {follows.map((follow: Follower) => {
            return <li className='credits credits_item' key={follow.id}>{follow.follower}</li>
          })}
        </ul>
      </div>
      <div className='credits credits_section'>
        <h2 className='credits credits_h2'>New Bits!</h2>
        <ul className='credits credits_list'>
          {bits.map((bit: Bit) => {
            return <li className='credits credits_item' key={bit.id}>{bit.user} cheered {bit.bitCount}!</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Credits;
