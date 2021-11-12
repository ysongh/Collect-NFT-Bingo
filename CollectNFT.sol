// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract CollectNFT {
    uint public poolCount = 0;
    mapping(uint => Pool) public pools;
    
    uint public imageCount = 0;
    mapping(uint => Image) public images;
    
    mapping(address => mapping(uint => UserCard)) public userCardList;
    
    struct Pool {
        uint id;
        uint[] imageIdList;
        uint imageCount;
        address payable owner;
    }
    
    struct Image {
        uint id;
        uint poolId;
        string url;
        address payable owner;
    }
    
    struct UserCard {
        uint poolId;
        uint imageCount;
        uint[] imageIdList;
    }
    
    function createPool() external {
        poolCount++;
        pools[poolCount] = Pool(poolCount, new uint[](0), 0, msg.sender);
    }
    
    function addImageToPool(uint _poolId, string memory _url) external {
        // Add Image to the Image List
        imageCount++;
        images[imageCount] = Image(imageCount, _poolId, _url, msg.sender);
        
        // Add Image to the Pool
        Pool storage _pool = pools[_poolId];
        _pool.imageIdList.push(imageCount);
        _pool.imageCount++;
    }
    
    function createUserCard(uint _poolId) external {
        userCardList[msg.sender][_poolId] = UserCard(_poolId, 0, new uint[](0));
    }
    
    // function buyLootBox() external {
    //     for(uint i = 0; i < 5; i++){
    //         earnNFTofImage();
    //     }
    // }
    
    function earnNFTofImage() external {
        uint _randomNumber = getRandomValue(imageCount);
        Image storage _images = images[_randomNumber + 1];
        
        UserCard storage _userCard = userCardList[msg.sender][_images.poolId];
        _userCard.imageIdList.push(_images.id);
        _userCard.imageCount++;
    }
    
    function earnNFTofImageByPool(uint _poolId) external {
        Pool storage _pool = pools[_poolId];
        uint _randomNumber = getRandomValue(_pool.imageCount);
        
        UserCard storage _userCard = userCardList[msg.sender][_poolId];
        _userCard.imageIdList.push(_pool.imageIdList[_randomNumber]);
        _userCard.imageCount++;
    }
    
    function getPoolImages(uint _poolId) public view returns (uint [] memory){
        Pool storage _pool = pools[_poolId];
        return _pool.imageIdList;
    }
    
    function getUserImages(uint _poolId) public view returns (uint [] memory){
        UserCard storage _userCard = userCardList[msg.sender][_poolId];
        return _userCard.imageIdList;
    }
    
    function getPoolImageId(uint _poolId, uint _imageId) public view returns (uint){
        Pool storage _pool = pools[_poolId];
        return _pool.imageIdList[_imageId];
    }
    
    function checkWinner(uint _poolId) public view returns (bool){
        Pool storage _pool = pools[_poolId];
        UserCard storage _userCard = userCardList[msg.sender][_poolId];
        bool isMatch = false;
        
        for(uint i = 0; i < _pool.imageCount; i++){
            isMatch = false;
            
            for(uint j = 0; j < _userCard.imageCount; j++){
               if(_pool.imageIdList[i] == _userCard.imageIdList[j]){
                   isMatch = true;
                   break;
               }
            }
            
            if(isMatch == false) return false;
        }
        
        return true;
    }
    
    // Return a random number 0 - 100
    function getRandomValue(uint mod) internal view returns(uint) {
        return uint(keccak256(abi.encodePacked(now, block.difficulty, msg.sender))) % mod;
    }
}