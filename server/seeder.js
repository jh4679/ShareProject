Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        // create a date string
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var date = (month + "/" + day + "/" + year).toString();

        Accounts.createUser({
            username: 'Super User',
            email: 'Super@user.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User1',
            email: 'user1@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User2',
            email: 'user2@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User3',
            email: 'user3@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User4',
            email: 'user4@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User5',
            email: 'user5@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User6',
            email: 'user6@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User7',
            email: 'user7@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User8',
            email: 'user8@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User9',
            email: 'user9@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        Accounts.createUser({
            username: 'User10',
            email: 'user10@example.com',
            password: 'password',
            profile: {
                laughScore: 0,
                frownScore: 0,
                pukeScore: 0,
            }
        });

        var user0Id = Meteor.users.findOne({ username: 'Super User' })._id;
        var user1Id = Meteor.users.findOne({ username: 'User1' })._id;
        var user2Id = Meteor.users.findOne({ username: 'User2' })._id;
        var user3Id = Meteor.users.findOne({ username: 'User3' })._id;
        var user4Id = Meteor.users.findOne({ username: 'User4' })._id;
        var user5Id = Meteor.users.findOne({ username: 'User5' })._id;
        var user6Id = Meteor.users.findOne({ username: 'User6' })._id;
        var user7Id = Meteor.users.findOne({ username: 'User7' })._id;
        var user8Id = Meteor.users.findOne({ username: 'User8' })._id;
        UserFiles.insert({
            fileName: "Patient 1",
            filePost: "patient info 0",
            file: "",
            author: "User0",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ['Super User'], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Park",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "male"

        });
        UserFiles.insert({
            fileName: "Patient 1",
            filePost: "patient info 1",
            file: "",
            author: "User1",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User1"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Jang",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "female"

        });
        UserFiles.insert({
            fileName: "Patient 2",
            filePost: "patient info 2",
            file: "",
            author: "User2",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User2"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Kim",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "male"

        });
        UserFiles.insert({
            fileName: "Patient 3",
            filePost: "patient info 3",
            file: "",
            author: "User3",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User3"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Lee",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "female"

        });
        UserFiles.insert({
            fileName: "Patient 4",
            filePost: "patient info 4",
            file: "",
            author: "User4",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User4"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Son",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "male"

        });
        UserFiles.insert({
            fileName: "Patient 5",
            filePost: "patient info 5",
            file: "",
            author: "User5",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User5"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Han",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "female"

        });
        UserFiles.insert({
            fileName: "Patient 6",
            filePost: "patient info 6",
            file: "",
            author: "User6",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User6"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Kang",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "male"

        });
        UserFiles.insert({
            fileName: "Patient 7",
            filePost: "patient info 7",
            file: "",
            author: "User7",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User7"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Choi",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "female"

        });
        UserFiles.insert({
            fileName: "Patient 8",
            filePost: "patient info 8",
            file: "",
            author: "User8",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User8"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Nam",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "male"

        });
        UserFiles.insert({
            fileName: "Patient 9",
            filePost: "patient info 9",
            file: "",
            author: "User9",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User9"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Ok",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "female"

        });
        UserFiles.insert({
            fileName: "Patient 10",
            filePost: "patient info 10",
            file: "",
            author: "User10",
            date: date,
            createdAt: new Date(), //이거 추가한 날짜및 시간
            voted: ["User10"], //투표한 사람 이름 저장
            userId: user1Id, //현재 로그인한 유저의 id 저장
            patientname: "Wang",
            patientbirthdate: 1900 - 00 - 00,
            patientgender: "male"

        });
        console.log("    ");
        console.log("User & UserFile Database Seeded! Isn't that nice?! :P ");
        console.log("Now get to work! :)");
    }

});