import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Wallet from "../shared/wallet/Wallet";
import JoditEditor from "jodit-react";
import { BigNumber } from "@ethersproject/bignumber";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import mrsabi from "../abi/mrsabi.json";
import convert from "ethereum-unit-converter";

function Story() {

  const contractAddress = "0x2f8B8B239C89588d46b83Ad2fAA7CA7B3AB476f0";

  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  let tempSigner = tempProvider.getSigner();
  let tempContract = new ethers.Contract(contractAddress, mrsabi, tempSigner);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [posts, changePosts] = useState([]);
  const [stake, changeStake] = useState("0.0000000");
  const [wei,updatewei] = useState(0)
  const config = {
    readonly: false,
    height: 400,
  };

  const address = useSelector((state) => state.user.address);
  const uname = useSelector((state) => state.user.username);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = {
          storyID: "ch01",
        };

        const res = await axios.post(
          "https://evening-fortress-29065.herokuapp.com/api/v1/posts/loadPostsForStory",
          body,
          config
        );
        console.log(res.data);
        changePosts(res.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);

  const handleUpdate = (e) => {
    const editorContent = e;
    setContent(editorContent);
    // console.log(content);
  };

  const [payWallStatus, setPayWallStatus] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    window.addEventListener("unlockProtocol.status", function (event) {
      setPayWallStatus(event.detail.state);
    });

    window.addEventListener("unlockProtocol.authenticated", function (event) {
      setUserInfo(event.detail.address);
    });

    window.addEventListener("unlockProtocol.transactionSent", function (event) {
      console.log(event.detail.hash);
    });
  }, []);

  const alterStake = (e) => {
    changeStake(e.target.value);
    updatewei(convert(e.target.value,'ether','wei'));
    // console.log(stake);
  };

  const publish = async() => {
    console.log(wei);
    try {
      const tx = await tempContract.functions.transfer(
        "0x8522251E68f698c72bF146E208E6d0889dC8adD2",
        wei
      );
      console.log("success");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        address: address,
        uname:uname,
        storyID:"ch01",
        content:content,
        stakedMRS:stake,
        likes:0
      };

      const res = await axios.post(
        "https://evening-fortress-29065.herokuapp.com/api/v1/posts/createpost",
        body,
        config
      );

      changePosts([...posts,body]);



    } catch (error) {
      console.log(error);
    }
    
  }

  const likeHandler = async(e) => {
    const id = e.target.id.toString();
    console.log(id);
    for(let i=0;i<posts.length;i++){
      if(posts[i]._id === id){
        console.log(id);
        //increment likes
        try {
          const tx = await tempContract.functions.transfer(
            "0x8522251E68f698c72bF146E208E6d0889dC8adD2",
            "500000000000000"
          );
          console.log("success");
        } catch (error) {
          console.log(error);
        }
        const newLikes = posts[i].likes++;
        const newArr = posts.map((post) => {
         return( post._id === id ?
            {...post, likes:1} : post)
          
        })
        console.log(newArr)
        changePosts([...newArr]);
      }
    }

    
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-row  justify-between">
        <Sidebar />
        <div className="m-4 w-[50rem]">
          <h2 className="mb-4 text-2xl text-left font-alata">
            Minerpets World &gt; Main Story &gt; Part I
          </h2>

          <div className="px-8 py-8 mb-4 text-left bg-[#f5f5f5]">
            <h2 className="font-xl mb-2  font-bold">Part I, Setting:</h2>
            <p className="font-base mb-2">
              Dad -&gt; works as a Minerpets Biologist/ zoologist and <br />
              Mom -&gt; works at the observatory , observing the patterns in the
              stars and the auroras <br /> Location -&gt; the research islands
              on the northwest tip ! alos called the Research town.
            </p>
            <ol className="list-decimal ml-4">
              <li>
                Protagonist - player is a minerpet explorer - has minerpet e0
                bloc [fire water grass ]
              </li>
              <li>Mom - researcher at observatory , has 2 driblees e1</li>
              <li>
                Dad - cryptoZoologist with access to Crypto Genes research , has
                1 gensist e2 , 1 flametwig e1
              </li>
              <li>
                CryptoProf Ansajy - observer at observatory, has a Ladrake e2
                (beginning )
              </li>
              <li>Prof wife Dasarp - nft artist - has a startst e1</li>
              <li>
                Prof Kid rival / friend J - minerpet explorer - has minerpet e0
                bloc [fire water grass ]
              </li>
              <li>
                Fruit herder Mather - has a garden growing different fruits{" "}
              </li>
              <li>
                Vacationing Dev coder Shsua - codes up new contracts - has 1
                defeg (dog ) , 1 direfang (dog ) e3{" "}
              </li>
              <li>
                Dev coder family Mashra - kid of Shsua , learning stuff online
                has a{" "}
              </li>
              <li>Local store/market Owner Calreine - </li>
              <li>
                The home of old man Ashma - retired and talks about the time he
                was a trainer or rather a explorer
              </li>
              <li>
                Observer student likvita - who will go back to the city but
                currently works as assistant in observatory ( her dad is someone
                really famous in mega-ethereum city{" "}
              </li>
            </ol>
            <p className="font-base mb-2">What needs to be added next ?</p>
            <p className="font-base mb-2">
              The different homes and buildings in the town
            </p>
          </div>

          <hr className="border-1 border-black my-8"></hr>
          <h1 className="text-2xl mt-8 mb-8 text-left font-alata">Posts</h1>

          {/* <div className="px-8 py-8 text-left bg-[#f5f5f5]">
            <div className="flex flex-row mb-8 items-center">
              <div className="bg-blue-500 rounded-full w-8 h-8"></div>
              <p className="text-base ml-4">username</p>
            </div>

            <div className="">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
              ab ea eligendi. Dolor quaerat tempora doloremque tempore fugit
              voluptatem quasi.
            </div>

            <div className="flex flex-row w-[45rem] justify-evenly items-center my-8">
              <p>Staked MRS :</p>
              <p>Likes: </p>
              <button 
              className="bg-blue-500 px-8 py-2 text-white rounded-2xl">
                Like
              </button>
            </div>
          </div> */}

          {posts &&
            posts.map((post) => {
              return (
                <div
                  key={post._id}
                  className="px-8 py-8 my-8 text-left bg-[#f5f5f5]"
                >
                  <div className="flex flex-row mb-8 items-center">
                    <div className="bg-blue-500 rounded-full w-8 h-8"></div>
                    <p className="text-base ml-4">{post.uname}</p>
                  </div>

                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>

                  <div className="flex border rounded-xl p-4 border-black flex-row w-[45rem] justify-evenly items-center mt-8 mb-2">
                    <p>Staked MRS : {post.stakedMRS}</p>
                    <p>Likes: {post.likes}</p>
                    <button
                      id={post._id}
                      className="bg-blue-500 px-8 py-2 text-white rounded-2xl"
                      onClick={e => likeHandler(e)}
                    >
                      Like
                    </button>
                  </div>
                </div>
              );
            })}

          <hr className="border-1 border-black my-8"></hr>

          <div className="px-8 py-8 text-left bg-[#f5f5f5]">
            <h2 className="font-xl mb-2  font-bold">Your Contribution</h2>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(e) => handleUpdate(e)}
              onChange={(newContent) => {}}
            />
            {/* <div dangerouslySetInnerHTML={{__html:content}}/> */}
            <div className="h-[15rem] flex flex-col justify-evenly items-start my-8">
              <label>Select MRS token to stake</label>
              <input
              className="border p-4 border-black rounded-xl"
                type="number"
                step="0.0000001"
                onChange={(e) => alterStake(e)}
                value={stake}
              />
              <button onClick={publish}
              className="bg-blue-500 px-8 py-2 text-white rounded-2xl">
                Stake and Publish
              </button>
            </div>
          </div>
        </div>
        <div className="m-4">{/* <Wallet /> */}</div>
      </div>
    </div>
  );
}

export default Story;
