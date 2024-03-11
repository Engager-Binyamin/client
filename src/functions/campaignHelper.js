// const fakeMsg = {
//     subject: "Subject of Msg",
//     content: "Content of this Msg",
//     _id: "65c09d8d2f7d7f06f51edb4c",
//     creationDate: "2024,",
//     leads: [
//         {
//             _id: '65c09c25ffdd655d252813a7',
//             name: 'hotam',
//             email: 'hotam@gmail.com',
//             phone: '0526741010',
//             notes: 'no notes',
//             campaigns: [
//                 '65c0939a5aa397278552a5b5',
//                 '65c093c65aa397278552a5b8',
//                 '65c094045aa397278552a5c5'
//             ],

//         },
//         {
//             _id: '65c09e5218d7ccaa7d56a553',
//             name: 'tehila',
//             email: 'tehila@gmail.com',
//             phone: '0524489675',
//             notes: 'no notes',
//             campaigns: ['65c0939a5aa397278552a5b5'],

//         },
//         {
//             _id: '65c09f8d18d7ccaa7d56a557',
//             name: 'maayan',
//             email: 'maayan@gmail.com',
//             phone: '0585855237',
//             notes: 'no notes',
//             campaigns: [
//                 '65c0939a5aa397278552a5b5',
//                 '65c093c65aa397278552a5b8'
//             ],

//         }
//     ]
// }

// const fakeCampaignObject = {
//     _id: '65c0939a5aa397278552a5b5',
//     user: '65ba97e536d6af41e9beb0d1',
//     title: 'hip-hop',
//     msg: [
//         {
//             subject: 'NEW messege',
//             content: 'campaign 1 messege number 1',
//             _id: '65c09d8d2f7d7f06f51edb4c',
//             creationDate: '2024-02-05T08:34:21.949Z',
//             leads: [
//                 {
//                     _id: '65c09c25ffdd655d252813a7',
//                     name: 'hotam',
//                     email: 'hotam@gmail.com',
//                     phone: '0526741010',
//                     notes: 'no notes',
//                     campaigns: [
//                         '65c0939a5aa397278552a5b5',
//                         '65c093c65aa397278552a5b8',
//                         '65c094045aa397278552a5c5'
//                     ],

//                 },
//                 {
//                     _id: '65c09e5218d7ccaa7d56a553',
//                     name: 'tehila',
//                     email: 'tehila@gmail.com',
//                     phone: '0524489675',
//                     notes: 'no notes',
//                     campaigns: ['65c0939a5aa397278552a5b5'],

//                 },
//                 {
//                     _id: '65c09f8d18d7ccaa7d56a557',
//                     name: 'maayan',
//                     email: 'maayan@gmail.com',
//                     phone: '0585855237',
//                     notes: 'no notes',
//                     campaigns: [
//                         '65c0939a5aa397278552a5b5',
//                         '65c093c65aa397278552a5b8'
//                     ],

//                 }
//             ]
//         },
//         {
//             subject: ' be happy ',
//             content: ' bla blo',
//             _id: '65c09df799fac51bc6296c5c',
//             creationDate: '2024-02-05T08:36:07.678Z',
//             leads: []
//         },
//         {
//             subject: 'NEW messege2',
//             content: 'campaign 1 messege number 2',
//             _id: '65c09efdeba0615578c20bd3',
//             creationDate: '2024-02-05T08:40:29.584Z',
//             leads: []
//         }
//     ],
//     leads: [
//         {
//             _id: '65c09c25ffdd655d252813a7',
//             name: 'hotam',
//             email: 'hotam@gmail.com',
//             phone: '0526741010',
//             notes: 'no notes',
//             campaigns: [
//                 '65c0939a5aa397278552a5b5',
//                 '65c093c65aa397278552a5b8',
//                 '65c094045aa397278552a5c5'
//             ],

//         },
//         {
//             _id: '65c09e5218d7ccaa7d56a553',
//             name: 'tehila',
//             email: 'tehila@gmail.com',
//             phone: '0524489675',
//             notes: 'no notes',
//             campaigns: ['65c0939a5aa397278552a5b5'],

//         },
//         {
//             _id: '65c09f8d18d7ccaa7d56a557',
//             name: 'maayan',
//             email: 'maayan@gmail.com',
//             phone: '0585855237',
//             notes: 'no notes',
//             campaigns: [
//                 '65c0939a5aa397278552a5b5',
//                 '65c093c65aa397278552a5b8'
//             ],

//         },
//         {
//             _id: '65c09f8d18d7ccaa7d56aeee',
//             name: 'maayan',
//             email: 'maayan@gmail.com',
//             phone: '0585855237',
//             notes: 'no notes',
//             campaigns: [
//                 '65c0939a5aa397278552a5b5',
//                 '65c093c65aa397278552a5b8'
//             ],

//         },
//         {
//             _id: '65c09f8d18d7ccaa7d56a111',
//             name: 'maimon',
//             email: 'momi@gmail.com',
//             phone: '0585855437',
//             notes: 'no notes',
//             campaigns: [
//                 '65c0939a5aa397278552a5b5',
//                 '65c093c65aa397278552a5b8'
//             ],

//         },
//     ]
// }
// let campaignObj = fakeCampaignObject
// let msgId = fakeMsg._id
// let leadId = '65c09f8d18d7ccaa7d56a557'

function msgSentLeads(campaignObj, msgId) {
    const recivedMsg = campaignObj?.receivedMsgs?.filter(msg => msg.msgId === msgId);
    return recivedMsg?.map(rm => {
        let fullLead = campaignObj.leads.find(l => l._id == rm.leadId);
        return { ...fullLead, receptionDate: rm.sentDate }
    }) 
}

function msgNotSentLeads(campaignObj, msgId) {
    const sentLeads = msgSentLeads(campaignObj, msgId);
    const leadIds = sentLeads?.map(s => s._id);
    return campaignObj.leads.filter(cl => !leadIds.includes(cl._id));
}

function msgSentDetails(campaign, msgId) {
    if (!Object.keys(campaign).length) return {}
    return {
        sent: msgSentLeads(campaign, msgId),
        notSent: msgNotSentLeads(campaign, msgId)
    }
}

function leadMsgs(campaignObj, leadId) {
    const msgArrayOfCampaign = campaignObj.msg
    const arrayOfleadMsgs = []
    msgArrayOfCampaign.forEach(msg => {
        if (msg.leads.some(lead => lead._id === leadId)) {
            arrayOfleadMsgs.push(msg)
        }
    });


    return arrayOfleadMsgs
}

export default { msgSentLeads, msgNotSentLeads, msgSentDetails, leadMsgs }