package io.rift.model;

public class Views {

    public interface Public {}

    
    public interface InternalNotificationUser extends Public {}

    public interface InternalNotificationCreator extends Public {}
    
    public interface InternalNotificationRG extends Public {}

    public interface InternalRifterGameGR extends Public {}

    public interface InternalRifterGameUsertable extends Public {}
    
    public interface InternalRifterGameNotification extends Public {}

    public interface InternalGameRequestRG extends Public {}

    public interface InternalGameRequestUsertable extends Public {}

    public interface InternalUsertableUser extends Public {}

    public interface InternalUsertableCreator extends Public {}

    public interface InternalUsertableGR extends Public {}

    public interface InternalUsertableRG extends Public {}

    public interface InternalNotificationUserCreator extends InternalNotificationUser, InternalNotificationCreator {}
}
