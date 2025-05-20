// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract Secim {
    struct Voter {
        address addr;
        bool hasVoted;
    }

    Voter[5] public voters;
    mapping(address => uint8) public voterIndex;
    uint64 public candidate1Votes;
    uint64 public candidate2Votes;
    address public owner;
    bool public votingActive = true;

    constructor(address[5] memory _voters) {
        owner = msg.sender;
        for (uint8 i = 0; i < 5; i++) {
            voters[i] = Voter(_voters[i], false);
            voterIndex[_voters[i]] = i + 1; // 0 ise oy hakki yok!
        }
    }

    function vote(uint8 candidate) public {
        require(votingActive, "Oylama bitti");
        uint8 idx = voterIndex[msg.sender];
        require(idx > 0, "Bu adrese oy hakki tanimli degil");
        require(!voters[idx - 1].hasVoted, "Daha once oy kullanildi");
        require(candidate == 1 || candidate == 2, "Gecersiz aday");

        voters[idx - 1].hasVoted = true;
        if (candidate == 1) {
            candidate1Votes += 1;
        } else {
            candidate2Votes += 1;
        }
    }

    function getVotes() public view returns (uint64, uint64) {
        return (candidate1Votes, candidate2Votes);
    }

    function endVoting() public {
        require(msg.sender == owner, "Sadece sahibi bitirebilir");
        votingActive = false;
    }
}
