package io.rift.repository;


import io.rift.config.SwaggerConfig;
import io.rift.model.Usertable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsertableRepository extends CrudRepository<Usertable, Integer> {

    Usertable findById(Integer id);

}
