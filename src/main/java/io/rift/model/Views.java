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

    public interface NotificationInfo extends NotificationId, NotificationUserId, NotificationType, NotificationContent,
            NotificationSessionId, NotificationCreatedTime, NotificationCreatorId, NotificationSeen {}

    public interface NotificationId {}

    public interface NotificationUserId {}

    public interface NotificationType {}

    public interface NotificationContent {}

    public interface NotificationSessionId {}

    public interface NotificationCreatedTime {}

    public interface NotificationCreatorId {}

    public interface NotificationSeen {}

    public interface NotificationCreatorUsertable {}

    public interface NotificationReceiverUsertable {}

    public interface NotificationRifterSession {}


    /****************** RifterSession Attributes **********************/
    /******************************************************************/

    public interface RifterSesionInfo extends RifterSessionCardInfo, RifterSessionNumSlots, RifterSessionExpirationTime,
            RifterSessionMethodOfContact, RifterSessionSessionType, RifterSessionHits, RifterSessionCreatedTime,
            RifterSessionDescription {}

    public interface RifterSessionCardInfo extends RifterSessionId, RifterSessionHostId, RifterSessionSlotsRemaining, RifterSessionCost,
            RifterSessionSessionTime, RifterSessionConsole, RifterSessionGameId, RifterSessionTitle, RifterSessionSessionDuration {}

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

    public interface RifterSessionGameId {}

    public interface RifterSessionConsole {}

    public interface RifterSessionSlotsRemaining {}

    public interface RifterSessionCreatedTime {}

    public interface RifterSessionDescription {}

    public interface RifterSessionSessionRequests {}

    public interface RifterSessionUsertable {}

    public interface RifterSessionNotifications {}

    public interface RifterSessionPlayers {}

    public interface RifterSessionGame {}

    public interface RifterSessionGameLevenshtein {}

    public interface RifterSessionGameFirstWordLevenshtein {}

    public interface RifterSessionRiftTagLevenshtein {}


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

    public interface UserRatingAttributes extends UserRatingId, UserRatingRiftId, UserRatingAccountType, UserRatingRating,
            UserRatingReview, UserRatingReviewerId, UserRatingCreatedTime, UserRatingReviewTitle {}

    public interface UserRatingId {}

    public interface UserRatingRiftId {}

    public interface UserRatingAccountType {}

    public interface UserRatingRating {}

    public interface UserRatingReview {}

    public interface UserRatingReviewerId {}

    public interface UserRatingCreatedTime {}

    public interface UserRatingReviewTitle {}

    public interface UserRatingRiftUsertable {}

    public interface UserRatingReviewerUsertable {}


    /****************** Usertable Attributes ***********************/
    /****************************************************************/

    public interface UsertableInfo extends UsertableId, UsertableAuth0Id, UsertableBraintreeId, UsertableFirstName, UsertableLastName, UsertableRiftTag,
            UsertableGender, UsertableTwitchAccount, UsertableYoutubeAccount, UsertableRifterRating, UsertableRifteeRating,
            UsertableIsPrivate, UsertableIsSuspended, UsertableProfilePicturePath, UsertableBio, UsertableEmail {}

    public interface UsertableRestrictedInfo extends UsertableId, UsertableFirstName, UsertableLastName, UsertableRiftTag,
            UsertableProfilePicturePath {}

    public interface UsertableCardInfo extends UsertableRestrictedInfo, UsertableRifterRating, UsertableRifteeRating, UsertableBio {}

    public interface UsertableId {}

    public interface UsertableAuth0Id {}

    public interface UsertableBraintreeId {}

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

    public interface UsertableEmail {}

    public interface UsertableNotificationList {}

    public interface UsertableCreatorActivityList {}

    public interface UsertableBroadcastNotificationList {}

    public interface UsertableRifteeSessions {}

    public interface UsertableRifterSessions {}

    public interface UsertableRifteeRiftSessions {}

    public interface UsertableFollowers {}

    public interface UsertableFollowings {}

    public interface UsertableReceiverComplaints {}

    public interface UsertableSubmitterComplaints {}

    public interface UsertableRiftReviews {}

    public interface UsertableReviewerReviews {}

    public interface UsertableGamesPlayed {}

    public interface UsertableNumberFollowing {}

    public interface UsertableNumberFollowers {}

    public interface UsertableRiftTagLevenshtein {}

    public interface UsertableFirstNameLevenshtein {}

    public interface UsertableFullNameLevenshtein {}


    /****************** Game Attributes ***********************/
    /****************************************************************/

    public interface GameAttributes extends GameId, GameGame {}

    public interface GameId {}

    public interface GameGame {}

    /****************** GetProfilePage View ***********************/
    /**************************************************************/

    public interface ProfilePageView extends UsertableInfo, UsertableFollowers, UsertableFollowings, UsertableCreatorActivityList,
            UsertableGamesPlayed, UsertableNumberFollowing, UsertableNumberFollowers, UsertableNotificationList, UsertableBroadcastNotificationList,
            UsertableRifterSessions, FollowingFollowingUsertable,
            FollowingFollowerUsertable, NotificationInfo, NotificationRifterSession, NotificationCreatorUsertable,
            RifterSessionId, RifterSessionHostId, RifterSessionTitle, RifterSessionSessionTime, RifterSessionGameId, RifterSessionConsole,
            RifterSessionSlotsRemaining, RifterSessionGame, RifterSessionUsertable, GameAttributes {}

    public interface CreateGame extends RifterSessionHostId, RifterSessionNumSlots, RifterSessionConsole,
            RifterSessionSessionDuration, RifterSessionTitle, RifterSessionSessionTime, RifterSessionGameId,
            RifterSessionSlotsRemaining, RifterSessionCreatedTime {}

    public interface CreateUser extends UsertableAuth0Id, UsertableBraintreeId, UsertableFirstName, UsertableLastName, UsertableRiftTag {}

    public interface Search extends UsertableRiftTagLevenshtein, UsertableFirstNameLevenshtein, UsertableFullNameLevenshtein,
            UsertableId, UsertableFirstName, UsertableLastName, UsertableRiftTag, UsertableProfilePicturePath, UsertableBio,
            CreateGame, RifterSessionGameLevenshtein, RifterSessionGameFirstWordLevenshtein, RifterSessionRiftTagLevenshtein, RifterSessionId, RifterSessionUsertable {}

    public interface UserRifterSessions extends UsertableId, UsertableFirstName, UsertableLastName, UsertableRiftTag, UsertableRifterRating,
            UsertableProfilePicturePath, UsertableRifterSessions, RifterSessionId, RifterSessionHostId, RifterSessionNumSlots,
            RifterSessionExpirationTime, RifterSessionCost, RifterSessionMethodOfContact, RifterSessionSessionTime,
            RifterSessionSessionType, RifterSessionSessionDuration, RifterSessionTitle, RifterSessionHits, RifterSessionGameId,
            RifterSessionConsole, RifterSessionSlotsRemaining {}

    public interface GetUserRatings extends UserRatingAccountType, UserRatingRating, UserRatingReview, UserRatingReviewerId,
            UserRatingCreatedTime, UserRatingReviewerUsertable, UserRatingReviewTitle, UsertableId, UsertableFirstName, UsertableLastName,
            UsertableRiftTag, UsertableProfilePicturePath {}

    public interface SessionRequestsByRiftTag extends SessionRequestRifteeId, SessionRequestHostId, SessionRequestSessionId, SessionRequestAccepted {}

    public interface RifteeSessions extends RifterSessionCardInfo, RifterSessionSessionRequests, RifterSessionUsertable,
            SessionRequestAccepted, UsertableCardInfo, GameAttributes, RifterSessionGame {}

    public interface UserReviews extends UserRatingAttributes, UserRatingReviewerUsertable, UsertableRestrictedInfo {}

}
