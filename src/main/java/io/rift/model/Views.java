package io.rift.model;

public class Views {

    public interface Public {}

    /*******************************************************/
    /*************** Views for Notification ****************/
    public interface InternalNotificationUser extends Public {}

    public interface InternalNotificationCreator extends Public {}
    
    public interface InternalNotificationRG extends Public {}


    /*******************************************************/
    /************** Views for RifterGame ******************/
    public interface InternalRifterGameGR extends Public {}

    public interface InternalRifterGameUsertable extends Public {}
    
    public interface InternalRifterGameNotification extends Public {}


    /*******************************************************/
    /*************** Views for GameRequest *****************/
    public interface InternalGameRequestRG extends Public {}

    public interface InternalGameRequestUsertable extends Public {}


    /*******************************************************/
    /*************** Views for Usertable *******************/
    public interface InternalUsertableUser extends Public {}

    public interface InternalUsertableCreator extends Public {}

    public interface InternalUsertableGR extends Public {}

    public interface InternalUsertableRG extends Public {}

    public interface InternalUsertableFollowingFollower extends Public {}

    public interface InternalUsertableFollowingFollowing extends Public {}

    public interface InternalUsertableFollowingFollowerAndFollowing extends Public {}

    public interface InternalUsertableUserComplaintReceiver extends Public {}

    public interface InternalUsertableUserComplaintSubmitter extends Public {}

    public interface InternalUsertableUserRatingReceiver extends Public {}

    public interface InternalUsertableUserRatingSubmitter extends Public {}

    public interface ProfilePageView extends InternalUsertableGR, InternalUsertableRG {}


    /*******************************************************/
    /*************** Views for Following *****************/
    public interface InternalFollowingUsertableFollower extends Public {}

    public interface InternalFollowingUsertableFollowing extends Public {}


    /*******************************************************/
    /*************** Views for UserComplaint ***************/
    public interface InternalUserComplaintUsertableReceiver extends Public {}

    public interface InternalUserComplaintUsertableSubmitter extends Public {}


    /*******************************************************/
    /*************** Views for UserRating ******************/
    public interface InternalUserRatingUsertableReceiver extends Public {}

    public interface InternalUserRatingUsertableSubmitter extends Public {}




}
