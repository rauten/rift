package io.rift.model;

public class Views {

    public interface Public {}

    /****************** Following Attributes **********************/
    /**************************************************************/

    public interface FollowingFollowerId {}

    public interface FollowingFollowingId {}

    public interface FollowingAccepted{}

    public interface FollowingFollowerUsertable {}

    public interface FollowingFollowingUsertable {}


    /****************** Notification Attributes **********************/
    /*****************************************************************/

    public interface NotificationId {}

    public interface NotificationUserId {}

    public interface NotificationType {}

    public interface NotificationContent {}

    public interface NotificationSessionId {}

    public interface NotificationCreatedTime {}

    public interface NotificationCreatorId {}

    public interface NotificationCreatorUsertable {}

    public interface NotificationReceiverUsertable {}

    public interface NotificationRifterSession {}


    /****************** RifterSession Attributes **********************/
    /******************************************************************/

    public interface RifterSessionId {}

    public interface RifterSessionHostId {}

    public interface RifterSessionNumSlots {}

    public interface RifterSessionExpirationTime{}

    public interface RifterSessionCost {}

    public interface RifterSessionMethodOfContact {}

    public interface RifterSessionSessionType {}

    public interface RifterSessionSessionDuration {}

    public interface RifterSessionTitle {}

    public interface RifterSessionHits{}

    public interface RifterSessionSessionTime {}

    public interface RifterSessionGame{}

    public interface RifterSessionConsole {}

    public interface RifterSessionSlotsRemaining {}

    public interface RifterSessionCreatedTime {}

    public interface RifterSessionSessionRequests {}

    public interface RifterSessionUsertable {}

    public interface RifterSessionNotifications {}

    public interface RifterSessionPlayers {}


    /****************** SessionRequest Attributes **********************/
    /*******************************************************************/

    public interface SessionRequestRifteeId {}

    public interface SessionRequestSessionId {}

    public interface SessionRequestAccepted {}

    public interface SessionRequestHostId {}

    public interface SessionRequestRifterSession {}

    public interface SessionRequestRifteeUsertable {}

    public interface SessionRequestHostUsertable {}


    /****************** UserComplaint Attributes ***********************/
    /*******************************************************************/

    public interface UserComplaintRiftId {}

    public interface UserComplaintSubmitterId {}

    public interface UserComplaintComplaint {}

    public interface UserComplaintReceiverUsertable {}

    public interface UserComplaintSubmitterUsertable {}


    /****************** UserRating Attributes ***********************/
    /****************************************************************/

    public interface UserRatingId {}

    public interface UserRatingRiftId {}

    public interface UserRatingAccountType {}

    public interface UserRatingRating {}

    public interface UserRatingReview {}

    public interface UserRatingReviewerId {}

    public interface UserRatingRiftUsertable {}

    public interface UserRatingReviewerUsertable {}


    /****************** Usertable Attributes ***********************/
    /****************************************************************/

    public interface UsertableId {}

    public interface UsertableAuth0Id {}

    public interface UsertableFirstName {}

    public interface UsertableLastName {}

    public interface UsertableRiftTag {}

    public interface UsertableGender {}

    public interface UsertableTwitchAccount {}

    public interface UsertableYoutubeAccount {}

    public interface UsertableRifterRating {}

    public interface UsertableRifteeRating {}

    public interface UsertableIsPrivate {}

    public interface UsertableIsSuspended {}

    public interface UsertableProfilePicturePath {}

    public interface UsertableBio {}

    public interface UsertableNotificationList {}

    public interface UsertableCreatorActivityList {}

    public interface UsertableBroadcastNotificationList {}

    public interface UsertableRifteeSessions {}

    public interface UsertableRifterSessions {}

    public interface UsertableFollowers {}

    public interface UsertableFollowings {}

    public interface UsertableReceiverComplaints {}

    public interface UsertableSubmitterComplaints {}

    public interface UsertableRiftReviews {}

    public interface UsertableReviewerReviews {}

    public interface UsertableGamesPlayed {}

    public interface UsertableNumberFollowing {}

    public interface UsertableNumberFollowers {}


    /****************** GetProfilePage View ***********************/
    /**************************************************************/

    public interface ProfilePageView extends UsertableId, UsertableAuth0Id, UsertableFirstName, UsertableLastName,
            UsertableRiftTag, UsertableGender, UsertableFollowers, UsertableFollowings, UsertableCreatorActivityList,
            UsertableGamesPlayed, UsertableNumberFollowing, UsertableNumberFollowers, UsertableBroadcastNotificationList,
            UsertableRifterRating, UsertableRifteeRating, UsertableBio, FollowingFollowingUsertable, FollowingFollowerUsertable,
            NotificationType, NotificationContent, NotificationRifterSession, NotificationCreatedTime, RifterSessionTitle,
            RifterSessionSessionTime, RifterSessionGame, RifterSessionConsole, RifterSessionSlotsRemaining {}

    public interface CreateGame extends RifterSessionHostId, RifterSessionNumSlots, RifterSessionConsole,
            RifterSessionSessionDuration, RifterSessionTitle, RifterSessionSessionTime, RifterSessionGame,
            RifterSessionSlotsRemaining, RifterSessionCreatedTime {}

    public interface CreateUser extends UsertableAuth0Id, UsertableFirstName, UsertableLastName, UsertableRiftTag {}

}
